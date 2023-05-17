from flask import Blueprint, make_response, jsonify, request, json
from api.constants import PAGE_LIMIT
from api.algorithims import (
    DR,
    get_recommendations_from_description,
    get_recommendations_from_meta_data,
)
import os
import re


blueprint = Blueprint("recipes", __name__)
path = os.path.join(os.getcwd(), "api/data/recipes.json")
with open(path, "r") as reader:
    data = json.loads(reader.read())


@blueprint.route("/", methods=["GET"])
def recipes():
    try:
        args = request.args
        lastId = request.args.get("lastId")
        lastInHistoryRecipeId = args.get("lastInHistoryRecipeId")
        limit = int(args.get("limit")) if args.get("limit") else PAGE_LIMIT
        """"Recommendation
        * if we don't have history, and favorites we use demographic
        recommendation
        """
        _history = [x for x in data if x["id"] == lastInHistoryRecipeId]
        if _history:
            ids = get_recommendations_from_description(_history[0]["name"], path)
            grouped_data = [
                next(item for item in data if item["id"] == id) for id in ids
            ]
            if lastId:
                last_index = (
                    next((index for (index, d) in enumerate(ids) if d == lastId), None)
                    + 1
                )
                next_docs = limit + last_index
                _ids = ids[last_index:next_docs]
                _recipes = [i for i in grouped_data if i["id"] in _ids]
                recipes = {
                    "hasNext": _recipes[-1]["id"] != ids[-1],
                    "recipes": _recipes,
                    "lastId": _recipes[-1]["id"],
                    "total": len(_recipes),
                    "category": "recipes",
                }
                return make_response(jsonify(recipes)), 200
            else:
                _ids = ids[:limit]
                _recipes = [i for i in grouped_data if i["id"] in _ids]
                hasNext = _recipes[-1]["id"] != ids[-1]
                recipes = {
                    "hasNext": hasNext,
                    "recipes": _recipes,
                    "lastId": _recipes[-1]["id"] if hasNext else None,
                    "total": len(_recipes),
                    "category": "recipes",
                }
                return make_response(jsonify(recipes)), 200
        else:
            ids = DR(path)()
            grouped_data = [
                next(item for item in data if item["id"] == id) for id in ids
            ]
            if lastId:
                last_index = (
                    next((index for (index, d) in enumerate(ids) if d == lastId), None)
                    + 1
                )
                next_docs = limit + last_index
                _ids = ids[last_index:next_docs]
                _recipes = [i for i in grouped_data if i["id"] in _ids]
                hasNext = _recipes[-1]["id"] != ids[-1]
                recipes = {
                    "hasNext": hasNext,
                    "recipes": _recipes,
                    "lastId": _recipes[-1]["id"] if hasNext else None,
                    "total": len(_recipes),
                    "category": "recipes",
                }
                return make_response(jsonify(recipes)), 200
            else:
                _ids = ids[:limit]
                _recipes = [i for i in grouped_data if i["id"] in _ids]
                hasNext = _recipes[-1]["id"] != ids[-1]
                recipes = {
                    "hasNext": hasNext,
                    "recipes": _recipes,
                    "lastId": _recipes[-1]["id"] if hasNext else None,
                    "total": len(_recipes),
                    "category": "recipes",
                }
                return make_response(jsonify(recipes)), 200
    except Exception as e:
        print(e)
        recipes = {
            "hasNext": False,
            "recipes": [],
            "lastId": None,
            "total": 0,
            "category": "recipes",
        }
        return make_response(jsonify(recipes)), 200


@blueprint.route("/search", methods=["GET"])
def recipes_search():
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
            _close_filter = filtered_recipes[0]
            ids = get_recommendations_from_meta_data(_close_filter["name"], path)
            grouped_data = [
                next(item for item in data if item["id"] == id) for id in ids
            ]
            if lastId:
                last_index = (
                    next(
                        (index for (index, d) in enumerate(ids) if d == lastId),
                        None,
                    )
                    + 1
                )
                next_docs = limit + last_index
                _ids = ids[last_index:next_docs]
                _recipes = [i for i in grouped_data if i["id"] in _ids]
                hasNext = _recipes[-1]["id"] != ids[-1]
                recipes = {
                    "hasNext": hasNext,
                    "recipes": _recipes,
                    "lastId": _recipes[-1]["id"] if hasNext else None,
                    "total": len(_recipes),
                    "category": "recipes",
                }
                return make_response(jsonify(recipes)), 200
            else:
                _ids = ids[:limit]
                _recipes = [i for i in grouped_data if i["id"] in _ids]
                hasNext = _recipes[-1]["id"] != ids[-1]
                recipes = {
                    "hasNext": hasNext,
                    "recipes": _recipes,
                    "lastId": _recipes[-1]["id"] if hasNext else None,
                    "total": len(_recipes),
                    "category": "recipes",
                }
                return make_response(jsonify(recipes)), 200
        except Exception as e:
            print(e)
            recipes = {
                "hasNext": False,
                "recipes": [],
                "lastId": None,
                "total": 0,
                "category": "recipes",
            }
            return make_response(jsonify(recipes)), 200
    else:
        recipes = {
            "hasNext": False,
            "recipes": [],
            "lastId": None,
            "total": 0,
            "category": "recipes",
        }
        return make_response(jsonify(recipes)), 200
