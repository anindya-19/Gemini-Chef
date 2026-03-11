import React from "react"
import IngredientsList from "./IngredientsList"
import { getRecipeFromGemini } from "../ai.js"
import GeminiRecipe from "./GeminiRecipe.jsx"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false)

    const [recipe, setRecipe] = React.useState("")
    async function toggleRecipeShown() {
        try {
            if (!recipe) {
                const recipeMarkdown = await getRecipeFromGemini(ingredients)
                setRecipe(recipeMarkdown)
                console.log(recipeMarkdown)
            }
            setRecipeShown(prevState => !prevState)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                />
            }

            {recipeShown && <GeminiRecipe
                recipe={recipe}
            />}
        </main>
    )
}