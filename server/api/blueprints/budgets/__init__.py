from flask import Blueprint, make_response, jsonify, request, json
from api.constants import PAGE_LIMIT
import os
import re

blueprint = Blueprint("budget", __name__)
path = os.path.join(os.getcwd(), "api/data/budget.json")
with open(path, "r") as reader:
    data = json.loads(reader.read())


@blueprint.route("/", methods=["GET"])
def budget():
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
            "category": "budget",
        }
        return make_response(jsonify(recipes)), 200
    else:
        _recipes = data[:limit]
        recipes = {
            "hasNext": _recipes[-1]["id"] != data[-1]["id"],
            "recipes": _recipes,
            "lastId": _recipes[-1]["id"],
            "total": len(_recipes),
            "category": "budget",
        }
        return make_response(jsonify(recipes)), 200


@blueprint.route("/search", methods=["GET"])
def budget_search():
    args = request.args
    lastId = args.get("lastId")
    limit = int(args.get("limit")) if args.get("limit") else PAGE_LIMIT
    searchTerm = args.get("searchTerm")
    if searchTerm and len(searchTerm.strip()) > 3:
        try:
            filtered_recipes = list(
                filter(
                    lambda x: any(
                        [
                            re.search(searchTerm, x["name"], re.IGNORECASE),
                            re.search(searchTerm, x["author"], re.IGNORECASE),
                            re.search(searchTerm, x["description"], re.IGNORECASE),
                            re.search(searchTerm, x["difficult"], re.IGNORECASE),
                            re.search(searchTerm, x["dish_type"], re.IGNORECASE),
                        ]
                    ),
                    data,
                )
            )
            sorted_filtered_recipes = list(
                sorted(filtered_recipes, key=lambda x: x["rattings"])
            )
            if lastId:
                last_index = (
                    next(
                        (
                            index
                            for (index, d) in enumerate(sorted_filtered_recipes)
                            if d["id"] == lastId
                        ),
                        None,
                    )
                    + 1
                )
                next_docs = limit + last_index
                _recipes = sorted_filtered_recipes[last_index:next_docs]
                recipes = {
                    "hasNext": _recipes[-1]["id"] != sorted_filtered_recipes[-1]["id"],
                    "recipes": _recipes,
                    "lastId": _recipes[-1]["id"],
                    "total": len(_recipes),
                    "category": "budget",
                }
                return make_response(jsonify(recipes)), 200
            else:
                _recipes = sorted_filtered_recipes[:limit]
                recipes = {
                    "hasNext": _recipes[-1]["id"] != sorted_filtered_recipes[-1]["id"],
                    "recipes": _recipes,
                    "lastId": _recipes[-1]["id"],
                    "total": len(_recipes),
                    "category": "budget",
                }
                return make_response(jsonify(recipes)), 200
        except Exception as e:
            print(e)
            recipes = {
                "hasNext": False,
                "recipes": [],
                "lastId": None,
                "total": 0,
                "category": "inspiration",
            }
            return make_response(jsonify(recipes)), 200
    else:
        recipes = {
            "hasNext": False,
            "recipes": [],
            "lastId": None,
            "total": 0,
            "category": "budget",
        }
        return make_response(jsonify(recipes)), 200
