from flask import Flask, request, jsonify
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
import torch
import librosa
from textprocess import recibirjson


app = Flask(__name__)

model = Wav2Vec2ForCTC.from_pretrained("jonatasgrosman/wav2vec2-large-xlsr-53-spanish")
model.load_state_dict(torch.load('D:/Universidad/TP-1/PlataformaWeb/backend/backend/src/model.pth'))
processor = Wav2Vec2Processor.from_pretrained("jonatasgrosman/wav2vec2-large-xlsr-53-spanish")

@app.route('/transcribe', methods=['POST', 'GET'])
def transcribe():
    audio = request.files['audio'] # RECIBO DEL FRONT ( POR COMANDO UN WAV)

    input_audio,_   = librosa.load(audio, sr=16000)
    inputs = processor(input_audio, sampling_rate=16_000, return_tensors="pt", padding=True)
    with torch.no_grad():
        logits = model(inputs.input_values, attention_mask=inputs.attention_mask).logits
    predicted_ids = torch.argmax(logits, dim=-1)
    predicted_sentences = processor.batch_decode(predicted_ids)
    print(predicted_sentences)
    return jsonify({"transcription": recibirjson(predicted_sentences[0])})


if __name__ == '__main__':
    app.run(debug=True)