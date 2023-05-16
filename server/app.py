from api.app import app
from api.constants import Keys
from flask import jsonify, make_response
from dotenv import load_dotenv
from api.blueprints import recipes, baking, budgets, health, inspirations
import os

load_dotenv()

app.register_blueprint(recipes.blueprint, url_prefix="/api/recipes/recipes")
app.register_blueprint(baking.blueprint, url_prefix="/api/recipes/baking")
app.register_blueprint(budgets.blueprint, url_prefix="/api/recipes/budget")
app.register_blueprint(health.blueprint, url_prefix="/api/recipes/health")
app.register_blueprint(inspirations.blueprint, url_prefix="/api/recipes/inspiration")


class AppConfig:
    PORT = 3001
    DEBUG = True


@app.route("/", methods=["GET"])
def hello_world():
    return (
        make_response(
            jsonify(
                {
                    "code": 200,
                    "message": "Cookron API",
                }
            )
        ),
        200,
    )


if __name__ == "__main__":
    app.run(
        debug=AppConfig().DEBUG,
        port=AppConfig().PORT,
    )
