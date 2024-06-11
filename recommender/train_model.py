import pandas as pd
import numpy as np
import joblib
from implicit.als import AlternatingLeastSquares
from scipy.sparse import csr_matrix

ratings_df = pd.read_csv("data/ratings.csv")
#ratings_df["movieId"] = ratings_df["movieId"].astype(int)

ratings_df["userId"] = ratings_df["userId"].astype(int)
ratings_df["movieId"] = ratings_df["movieId"].astype(int)
user_list = ratings_df["userId"].unique()
movie_list = ratings_df["movieId"].unique()

user_dic = {userId: index for index, userId in enumerate(user_list)}
movie_dic = {movieId: index for index, movieId in enumerate(movie_list)}

userNum = len(user_list)
rating_matrix = pd.DataFrame(index=user_list, columns=movie_list)

for _, row in ratings_df.iterrows():
    userId = row["userId"]
    movieId = row["movieId"]
    rating = row["rating"]
    rating_matrix.at[userId, movieId] = rating

rating_matrix.fillna(0, inplace=True)
rating_matrix_csr = csr_matrix(rating_matrix.values)

trained_model = AlternatingLeastSquares(factors=100, regularization=0.01, dtype=np.float64, iterations=50)


trained_model.fit(2*rating_matrix_csr)  # 가중치 일괄 3으로 적용



joblib.dump(rating_matrix, "./model/rating_matrix.joblib")
joblib.dump(trained_model,"./model/trained_model.joblib")
