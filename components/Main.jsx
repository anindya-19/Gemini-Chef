import React from "react"
import IngredientsList from "./IngredientsList"
import { getRecipeFromGemini } from "../ai.js"
import GeminiRecipe from "./GeminiRecipe.jsx"
import { useEffect, useRef } from "react"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [recipe, setRecipe] = React.useState("")
    const recipeRef = useRef(null)

    useEffect(() => {
        if (recipeShown && recipeRef.current) {
            recipeRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [recipeShown])
    async function toggleRecipeShown() {
        try {
            if (!recipe) {
                setLoading(true)
                const recipeMarkdown = await getRecipeFromGemini(ingredients)
                setRecipe(recipeMarkdown)
                setLoading(false)
                console.log(recipeMarkdown)
            }
            setRecipeShown(prevState => !prevState)
        }
        catch (err) {
            setLoading(false)
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
                    loading={loading}
                />
            }

            {loading && (
                <div className="loading-indicator">
                    <div className="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Chef Gemini is cooking up your recipe…</p>
                </div>
            )}

            {recipeShown && !loading && <GeminiRecipe
                recipe={recipe}
                ref={recipeRef}
            />}
        </main>
    )
}