# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# import os
# import matplotlib.pyplot as plt
# from io import BytesIO
# import base64

# # Dummy implementation of AnomalyTransformer
# class AnomalyTransformer:
#     def anomaly_score(self, data):
#         # Mock anomaly detection: random scores
#         return np.random.rand(len(data))

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = './uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Initialize model
# model = AnomalyTransformer()

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400

#     filepath = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(filepath)

#     # Process the file
#     try:
#         data = pd.read_csv(filepath).dropna().values
#         anomaly_scores = model.anomaly_score(data)
#         threshold = np.percentile(anomaly_scores, 95)
#         anomalies = anomaly_scores > threshold

#         # Generate plots
#         anomaly_plot = generate_plot(anomaly_scores, anomalies)
#         histogram_plot = generate_histogram(anomaly_scores)

#         return jsonify({
#             "anomaly_indices": np.where(anomalies)[0].tolist(),
#             "anomaly_plot": anomaly_plot,
#             "histogram_plot": histogram_plot
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# def generate_plot(anomaly_scores, anomalies):
#     plt.figure(figsize=(10, 6))
#     plt.plot(anomaly_scores, label="Anomaly Scores", color='blue')
#     plt.scatter(np.where(anomalies)[0], anomaly_scores[anomalies], color='red', label="Detected Anomalies")
#     plt.legend()
#     plt.title("Anomaly Scores and Detection")
#     plt.xlabel("Index")
#     plt.ylabel("Score")
#     plt.grid(True)

#     img = BytesIO()
#     plt.savefig(img, format='png')
#     img.seek(0)
#     return base64.b64encode(img.getvalue()).decode()


# def generate_histogram(anomaly_scores):
#     plt.figure(figsize=(10, 6))
#     plt.hist(anomaly_scores, bins=50, color='blue', edgecolor='black')
#     plt.title("Anomaly Score Distribution")
#     plt.xlabel("Score")
#     plt.ylabel("Frequency")
#     plt.grid(True)

#     img = BytesIO()
#     plt.savefig(img, format='png')
#     img.seek(0)
#     return base64.b64encode(img.getvalue()).decode()


# if __name__ == '__main__':
#     app.run(debug=True)









# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import numpy as np
# import os
# import matplotlib.pyplot as plt
# from io import BytesIO
# import base64
# import math

# class MinimaxStrategy:
#     def __init__(self, N, d_model, lambda_, sigma):
#         self.N = N
#         self.d_model = d_model
#         self.lambda_ = lambda_
#         self.sigma = sigma

#     @staticmethod
#     def gaussian_kernel(mean, sigma):
#         normalize = 1 / (math.sqrt(2 * math.pi) * sigma)
#         return normalize * np.exp(-0.5 * (mean / sigma) ** 2)

#     def prior_association(self):
#         p = np.abs(np.indices((self.N, self.N))[0] - np.indices((self.N, self.N))[1])
#         gaussian = self.gaussian_kernel(p, self.sigma)
#         gaussian /= np.sum(gaussian, axis=-1, keepdims=True)
#         return gaussian

#     def series_association(self, Q, K):
#         return self.softmax(np.dot(Q, K.T) / math.sqrt(self.d_model))

#     @staticmethod
#     def softmax(x):
#         e_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
#         return e_x / (np.sum(e_x, axis=-1, keepdims=True) + 1e-10)

# class AnomalyAttention:
#     def __init__(self, N, d_model, epsilon=1e-10, update_rate=0.1, sigma=1.0):
#         self.d_model = d_model
#         self.N = N
#         self.epsilon = epsilon
#         self.sigma = sigma
#         self.Wq = np.random.randn(d_model, d_model) * 0.01
#         self.Wk = np.random.randn(d_model, d_model) * 0.01
#         self.Wv = np.random.randn(d_model, d_model) * 0.01
#         self.Ws = np.random.randn(d_model, 1) * 0.01
#         self.P = np.random.randn(N, N) * 0.01
#         self.update_rate = update_rate
#         self.S = None

#     def softmax(self, x):
#         e_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
#         return e_x / (np.sum(e_x, axis=-1, keepdims=True) + self.epsilon)

#     def __call__(self, x):
#         Q = np.dot(x, self.Wq)
#         K = np.dot(x, self.Wk)
#         V = np.dot(x, self.Wv)
        
#         attention_scores = np.dot(Q, K.T) / np.sqrt(self.d_model)
#         self.S = self.softmax(attention_scores)
#         self.P = (1 - self.update_rate) * self.P + self.update_rate * self.S
#         return np.dot(self.S, V)

# class AnomalyTransformer:
#     def __init__(self, N, d_model, layers=4, lambda_=0.1, epsilon=1e-10, sigma=1.0):
#         self.layers = [AnomalyAttention(N, d_model, epsilon, sigma=sigma) for _ in range(layers)]
#         self.W_out = np.random.randn(d_model, 1) * 0.01
#         self.minimax_strategy = MinimaxStrategy(N, d_model, lambda_, sigma)

#     def __call__(self, x):
#         for layer in self.layers:
#             x = layer(x)
#         return np.dot(x, self.W_out)

#     def anomaly_score(self, data):
#         scores = []
#         for x in data:
#             x = x.reshape(1, -1)
#             y_pred = self(x)
#             reconstruction_error = np.mean((y_pred - x) ** 2)
#             P_list = [layer.P for layer in self.layers]
#             S_list = [layer.S for layer in self.layers]
#             association_discrepancy = sum(
#                 np.sum(P * np.log(P / (S + 1e-10) + 1e-10))
#                 for P, S in zip(P_list, S_list)
#             )
#             score = (reconstruction_error + 1e-10) * (association_discrepancy + 1e-10)
#             scores.append(score)
#         return np.array(scores)

# app = Flask(__name__)
# CORS(app)

# UPLOAD_FOLDER = './uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Set matplotlib to non-interactive backend
# plt.switch_backend('Agg')
# # Global model instance
# model = None

# def initialize_model(N, d_model):
#     global model
#     if model is None:
#         model = AnomalyTransformer(N, d_model)

# def generate_plot(anomaly_scores, anomalies):
#     plt.figure(figsize=(10, 6))
#     plt.plot(anomaly_scores, label="Anomaly Scores", color='blue')
#     plt.scatter(np.where(anomalies)[0], anomaly_scores[anomalies], 
#                 color='red', label="Detected Anomalies")
#     plt.legend()
#     plt.title("Anomaly Scores and Detection")
#     plt.xlabel("Index")
#     plt.ylabel("Score")
#     plt.grid(True)
    
#     img = BytesIO()
#     plt.savefig(img, format='png')
#     plt.close()
#     img.seek(0)
#     return base64.b64encode(img.getvalue()).decode()

# def generate_histogram(anomaly_scores):
#     plt.figure(figsize=(10, 6))
#     plt.hist(anomaly_scores, bins=50, color='blue', edgecolor='black')
#     plt.title("Anomaly Score Distribution")
#     plt.xlabel("Score")
#     plt.ylabel("Frequency")
#     plt.grid(True)
    
#     img = BytesIO()
#     plt.savefig(img, format='png')
#     plt.close()
#     img.seek(0)
#     return base64.b64encode(img.getvalue()).decode()

# @app.route('/upload', methods=['POST'])
# def upload_file():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({"error": "No selected file"}), 400
    
#     try:
#         # Save and process file
#         filepath = os.path.join(UPLOAD_FOLDER, file.filename)
#         file.save(filepath)
        
#         # Load and preprocess data
#         data = pd.read_csv(filepath).dropna().values
#         N, d_model = data.shape
        
#         # Initialize model if not already done
#         initialize_model(N, d_model)
        
#         # Normalize data
#         mean = np.mean(data, axis=0)
#         std = np.std(data, axis=0)
#         data_normalized = (data - mean) / std
        
#         # Generate anomaly scores
#         anomaly_scores = model.anomaly_score(data_normalized)
#         threshold = np.percentile(anomaly_scores, 95)
#         anomalies = anomaly_scores > threshold
        
#         # Generate visualizations
#         anomaly_plot = generate_plot(anomaly_scores, anomalies)
#         histogram_plot = generate_histogram(anomaly_scores)
        
#         return jsonify({
#             "anomaly_indices": np.where(anomalies)[0].tolist(),
#             "anomaly_scores": anomaly_scores.tolist(),
#             "threshold": float(threshold),
#             "anomaly_plot": anomaly_plot,
#             "histogram_plot": histogram_plot
#         })
        
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)








from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import os
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import math

class MinimaxStrategy:
    def __init__(self, N, d_model, lambda_, sigma):
        self.N = N
        self.d_model = d_model
        self.lambda_ = lambda_
        self.sigma = sigma

    @staticmethod
    def gaussian_kernel(mean, sigma):
        normalize = 1 / (math.sqrt(2 * math.pi) * sigma)
        return normalize * np.exp(-0.5 * (mean / sigma) ** 2)

    def prior_association(self):
        p = np.abs(np.indices((self.N, self.N))[0] - np.indices((self.N, self.N))[1])
        gaussian = self.gaussian_kernel(p, self.sigma)
        gaussian /= np.sum(gaussian, axis=-1, keepdims=True)
        return gaussian

    def series_association(self, Q, K):
        return self.softmax(np.dot(Q, K.T) / math.sqrt(self.d_model))

    @staticmethod
    def softmax(x):
        e_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
        return e_x / (np.sum(e_x, axis=-1, keepdims=True) + 1e-10)

class AnomalyAttention:
    def __init__(self, N, d_model, epsilon=1e-10, update_rate=0.1, sigma=1.0):
        self.d_model = d_model
        self.N = N
        self.epsilon = epsilon
        self.sigma = sigma
        self.Wq = np.random.randn(d_model, d_model) * 0.01
        self.Wk = np.random.randn(d_model, d_model) * 0.01
        self.Wv = np.random.randn(d_model, d_model) * 0.01
        self.Ws = np.random.randn(d_model, 1) * 0.01
        self.P = np.random.randn(N, N) * 0.01
        self.update_rate = update_rate
        self.S = None

    def softmax(self, x):
        e_x = np.exp(x - np.max(x, axis=-1, keepdims=True))
        return e_x / (np.sum(e_x, axis=-1, keepdims=True) + self.epsilon)

    def __call__(self, x):
        Q = np.dot(x, self.Wq)
        K = np.dot(x, self.Wk)
        V = np.dot(x, self.Wv)
        
        attention_scores = np.dot(Q, K.T) / np.sqrt(self.d_model)
        self.S = self.softmax(attention_scores)
        self.P = (1 - self.update_rate) * self.P + self.update_rate * self.S
        return np.dot(self.S, V)

class AnomalyTransformer:
    def __init__(self, N, d_model, layers=4, lambda_=0.1, epsilon=1e-10, sigma=1.0):
        self.layers = [AnomalyAttention(N, d_model, epsilon, sigma=sigma) for _ in range(layers)]
        self.W_out = np.random.randn(d_model, 1) * 0.01
        self.minimax_strategy = MinimaxStrategy(N, d_model, lambda_, sigma)

    def __call__(self, x):
        for layer in self.layers:
            x = layer(x)
        return np.dot(x, self.W_out)

    def anomaly_score(self, data):
        scores = []
        for x in data:
            x = x.reshape(1, -1)
            y_pred = self(x)
            reconstruction_error = np.mean((y_pred - x) ** 2)
            P_list = [layer.P for layer in self.layers]
            S_list = [layer.S for layer in self.layers]
            association_discrepancy = sum(
                np.sum(P * np.log(P / (S + 1e-10) + 1e-10))
                for P, S in zip(P_list, S_list)
            )
            score = (reconstruction_error + 1e-10) * (association_discrepancy + 1e-10)
            scores.append(score)
        return np.array(scores)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Set matplotlib to non-interactive backend
plt.switch_backend('Agg')
# Global model instance
model = None

# def initialize_model(N, d_model):
#     global model
#     if model is None:
#         model = AnomalyTransformer(N, d_model)
def initialize_model(N, d_model):
    global model
    if model is None or model.layers[0].d_model != d_model:
        model = AnomalyTransformer(N, d_model)


def generate_plot(anomaly_scores, anomalies):
    plt.figure(figsize=(10, 6))
    plt.plot(anomaly_scores, label="Anomaly Scores", color='blue')
    plt.scatter(np.where(anomalies)[0], anomaly_scores[anomalies], 
                color='red', label="Detected Anomalies")
    plt.legend()
    plt.title("Anomaly Scores and Detection")
    plt.xlabel("Index")
    plt.ylabel("Score")
    plt.grid(True)
    
    img = BytesIO()
    plt.savefig(img, format='png')
    plt.close()
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode()

def generate_histogram(anomaly_scores):
    plt.figure(figsize=(10, 6))
    plt.hist(anomaly_scores, bins=50, color='blue', edgecolor='black')
    plt.title("Anomaly Score Distribution")
    plt.xlabel("Score")
    plt.ylabel("Frequency")
    plt.grid(True)
    
    img = BytesIO()
    plt.savefig(img, format='png')
    plt.close()
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode()


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save and process file
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        # Load and preprocess data
        data = pd.read_csv(filepath).dropna().values
        N, d_model = data.shape

        # Initialize model if dimensions differ
        initialize_model(N, d_model)

        # Normalize data
        mean = np.mean(data, axis=0)
        std = np.std(data, axis=0)
        data_normalized = (data - mean) / std

        # Generate anomaly scores
        anomaly_scores = model.anomaly_score(data_normalized)
        threshold = np.percentile(anomaly_scores, 95)
        anomalies = anomaly_scores > threshold

        # Generate visualizations
        anomaly_plot = generate_plot(anomaly_scores, anomalies)
        histogram_plot = generate_histogram(anomaly_scores)

        return jsonify({
            "anomaly_indices": np.where(anomalies)[0].tolist(),
            "anomaly_scores": anomaly_scores.tolist(),
            "threshold": float(threshold),
            "anomaly_plot": anomaly_plot,
            "histogram_plot": histogram_plot
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)