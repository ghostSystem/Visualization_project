import sys
import json

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.spatial.distance import cdist, pdist
import random

from sklearn import manifold
from sklearn.cluster import KMeans
from sklearn.metrics import pairwise_distances
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler

from flask import Flask, request, jsonify
from flask import render_template

app = Flask(__name__, template_folder='template')

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/plot", methods=['POST'])
def plot():
	print("Inside Plot Function")
	rf=request.form
	print(rf)
	for key in rf.keys():
		data=key
	print(data)
	data_dic=json.loads(data)
	print(data_dic.keys())
	sum_data = data_dic['filter']
	print(sum_data)
	print("Individual Data")
	print(sum_data[0])
	print(sum_data[1])
	print(sum_data[2])
	print(sum_data[3])
	return "Return Data"



if __name__ == "__main__":
	app.run()