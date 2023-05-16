from flask import Blueprint, make_response, jsonify, request, json
from api.constants import PAGE_LIMIT
import os

blueprint = Blueprint("baking", __name__)
path = os.path.join(os.getcwd(), "api/data/baking.json")
with open(path, "r") as reader:
    data = json.loads(reader.read())


@blueprint.route("/", methods=["GET"])
def baking():
    args = request.args
    lastId = request.args.get("lastId")
    limit = int(args.get("limit")) if args.get("limit") else PAGE_LIMIT
    if lastId:
        last_index = (
            next((index for (index, d) in enumerate(data) if d["id"] == lastId), None)
            + 1
        )
        next_docs = limit + last_index
        _recipes = data[last_index:next_docs]
        recipes = {
            "hasNext": _recipes[-1]["id"] != data[-1]["id"],
            "recipes": _recipes,
            "lastId": _recipes[-1]["id"],
            "total": len(_recipes),
            "main_category": "baking",
        }
        return make_response(jsonify(recipes)), 200
    else:
        _recipes = data[:limit]
        recipes = {
            "hasNext": _recipes[-1]["id"] != data[-1]["id"],
            "recipes": _recipes,
            "lastId": _recipes[-1]["id"],
            "total": len(_recipes),
            "main_category": "baking",
        }
        return make_response(jsonify(recipes)), 200
