from flask import Flask, request
from flask import jsonify
from flask_cors import CORS, cross_origin
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import torch
import librosa
from textprocess import recibirjson
app = Flask(name)

CORS(app, resources={r"/transcribe": {"origins": "http://localhost:3000"}})

model = Wav2Vec2ForCTC.from_pretrained("jonatasgrosman/wav2vec2-large-xlsr-53-spanish")
model.load_state_dict(torch.load('./model.pth'))
processor = Wav2Vec2Processor.from_pretrained("jonatasgrosman/wav2vec2-large-xlsr-53-spanish")
#inputaudio,  = librosa.load(audio3, sr=16000)
#inputs = processor(input_audio, sampling_rate=16_000, return_tensors="pt", padding=True)
#with torch.no_grad():
logits = model(inputs.input_values, attention_mask=inputs.attention_mask).logits
#predicted_ids = torch.argmax(logits, dim=-1)
#predicted_sentences = processor.batch_decode(predicted_ids)
#print("Prediction:", predicted_sentences)
@app.route('/', methods=['GET'])
def server_status():
    return "El servidor API está listo para funcionar."

@app.route('/transcribe', methods=['POST'])
@cross_origin()
def transcribe():
    if 'audio' in request.files:
        audio = request.files['audio']
        audio.save('audio.wav')
        inputaudio, _ = librosa.load('audio.wav', sr=16000)
        inputs = processor(inputaudio, sampling_rate=16_000, return_tensors="pt", padding=True)
        with torch.no_grad():
            logits = model(inputs.input_values, attention_mask=inputs.attention_mask).logits
        predicted_ids = torch.argmax(logits, dim=-1)
        predicted_sentences = processor.batch_decode(predicted_ids)
        return jsonify({"transcription": recibirjson(predicted_sentences[0])})
    else:
        return jsonify({"error": "No se pudo cargar el archivo"}), 400

if name == 'main':
    app.run(debug=True)