# -*- coding: utf-8 -*-
"""Titanic.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1G1VnKwpi6BYd8E6fa1kQwVgbkGbiNCgq
"""

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pickle

dataframe = pd.read_csv('train.csv')
dataframe = dataframe.drop(columns = ['PassengerId', 'Name', 'Ticket', 'Cabin', 'Embarked','Fare'])
dataframe.head()

import seaborn as sns
ax = sns.countplot(x="Sex", data=dataframe)

import seaborn as sns
ax = sns.countplot(x="SibSp", data=dataframe)

import seaborn as sns
ax = sns.countplot(x="Parch", data=dataframe)

dataframe["Age"].min(), dataframe["Age"].max()

X = dataframe.iloc[: ,1:].values
y = dataframe.iloc[: ,0].values

from sklearn.impute import SimpleImputer
imputer = SimpleImputer(missing_values=np.nan, strategy='most_frequent')
imputer.fit(X[:,2:3])
X[:,2:3] = imputer.fit_transform(X[:,2:3])
X

from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
X[: ,1] = le.fit_transform(X[: ,1])
X

# from sklearn.preprocessing import StandardScaler
# sc = StandardScaler()
# X[:,2:] = sc.fit_transform(X[:,2:])

from sklearn.svm import SVC
classifier = SVC(kernel = 'rbf', random_state = 42)
classifier.fit(X, y)

model_file_path = 'trained_model.pkl'
pickle.dump(classifier, open(model_file_path, 'wb'))

import pickle
model = pickle.load(open('trained_model.pkl', 'rb'))
model

model.predict([[1,1,6,5,5]])

model.predict([[3,0,45,0,1]])

import sklearn
sklearn_version = sklearn.__version__

print(sklearn_version)

import six
six_version = six.__version__

print(six_version)

print(pickle.format_version)
