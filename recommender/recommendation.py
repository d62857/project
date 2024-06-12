import sys
import pandas as pd
import numpy as np
import joblib
import json
from implicit.als import AlternatingLeastSquares
from scipy.sparse import csr_matrix, vstack

movies_df = pd.read_csv("./data/movies.csv")
ratings_df = pd.read_csv("./data/ratings.csv")
links_df = pd.read_csv("./data/links.csv")


user_list = ratings_df["userId"].unique()
user_dic = {userId: index for index, userId in enumerate(user_list)}
movie_list = ratings_df["movieId"].unique()
movie_dic = {movieId: index for index, movieId in enumerate(movie_list)}

rating_matrix = joblib.load("model/rating_matrix.joblib") 
trained_model = joblib.load("model/trained_model.joblib")


userNum = len(user_list)
movieNum = len(movie_list)
result = []

# item-based 추천, similar_items를 통해 얻은 movieId에 해당하는 tmdbId를 반환
def recommendByItem(tmdbId, N=21):
    foundId = links_df.loc[links_df["tmdbId"] == int(tmdbId), "movieId"]
    if len(foundId) != 0:           # 추천기준이 된 영화가 tmdb링크가 존재하는지
        movieId = int(foundId.iloc[0])
        if movieId in rating_matrix.columns:     # 학습모델에 평가된 데이터가 존재하는지
            
            movie_idx = movie_dic[movieId]
            calculated = trained_model.similar_items(movie_idx, N=21)
            
            calculated = calculated[0]
            
            for similar_items_idx in (calculated):
                
                calculated_movieId = movie_list[similar_items_idx]
                tmdbId = links_df.loc[links_df['movieId'] == calculated_movieId, 'tmdbId']
                if len(tmdbId) != 0:
                    tmdbId = tmdbId.iloc[0]
                    
                    result.append(int(tmdbId))
                else:
                    continue                  # print("추천된 영화의 tmdb link 없음")      # 추천된 영화중 tmdb 링크가 없는경우
        else:
            return              #  print("학습모델에서 평가된적 없음")
    else:
        return                #  print("검색한 영화의 tmdb 링크 없음")
    result2 = []
    print(result)
    result2 = result
    return(result2)
        
# user-based 추천, 추천 대상자인 user의 ID와 {tmdbId:rating}을 파라미터로 받음. recommend를 통해 계산
def recommendByUser(new_user_ratings, N=21):
    new_user_row = np.zeros(movieNum)
    counter = 0
    for tmdbId, rating in new_user_ratings.items():
        foundId = links_df.loc[links_df["tmdbId"] == tmdbId, "movieId"]
        if len(foundId) != 0:
            counter += 1
            movieId = foundId.iloc[0]
            if movieId in movie_dic:
                movieIdx = movie_dic[movieId]
                new_user_row[movieIdx] = rating
            else:
                continue       # print(f"데이터에 없는 영화 movieId : {movieId}")
        else:
            continue   #print("link 데이터에 없음")        
    if counter == 0:
        return    # print("모든 영화가 데이터에 없음")
              
       
    
    new_user_row_csr = csr_matrix(new_user_row)
    calculated = trained_model.recommend(0, new_user_row_csr, N, recalculate_user=True)
    
 
    
    
    for movieIdx in calculated[0]:
        calculated_movieId = movie_list[movieIdx]
        tmdbId = links_df.loc[links_df["movieId"] == calculated_movieId, "tmdbId"]
        if len(tmdbId) != 0:
            tmdbId = tmdbId.iloc[0]
            result.append(int(tmdbId))
            
    result2 = result
    return(result2)
    
    

if __name__ == "__main__":
    try:
        if len(sys.argv) != 2:
            raise ValueError("Usage: recommendation.py <user_ratings_json>")
        
        input_data = json.loads(sys.argv[1])
        recommendations = recommendByUser(input_data)
        print(json.dumps(recommendations))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)



