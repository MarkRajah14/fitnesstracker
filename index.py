from flask_cors import CORS, cross_origin
from flask import Response

import flask
import json
import requests


app = flask.Flask(__name__)
cors = CORS(app)
app.config["Debug"] = True
app.config['CORS_HEADERS'] = "Content Type"

NOTION_SECRET = "secret_WZJtMuMSCoaV4PnvVhCepKdaLlCftjdFsFrmJWECVND"
DATABASE_ID = "%7BDATABASE_ID%7D" 

url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"

headers = {
    "Authorization": f"Bearer {NOTION_SECRET}",
    "Notion-Version": "2023-06-30"
}

@app.route('/workout_progress', methods = ["GET"])
@cross_origin()
def workout_progress():
    response_data = []
    notion_post_body = {
        "filter": {
            "property": "Name",
            "text": {
                "equals": flask.request.args.get("metric")
            }
        }
    }
    row = requests.posts (
        url,
        headers = headers,
        json = notion_post_body
    ).json()["results"][0]

    all_columns = row["properties"]
    for column, data in all_columns.items():
        if column in ["Name"]:
            continue 
        response_data.append({ 
            "week": column,
            "metric": data["rich_text"][0]["text"]["content"]
            }
        )
    response = app.response_class(
        response = json.dumps(response_data, default=str),
        status = 200,
        mimetype = "application/json"
    )
    return response
            
    
        
    