import Markdown from "react-markdown"
import { forwardRef } from "react"

const GeminiRecipe = forwardRef(function GeminiRecipe(props, ref) {
    return (
        <section className="suggested-recipe-container" aria-live="polite" ref={ref}>
            <h2>Chef Gemini Recommends:</h2>
            <div className="recipe-content">
                <Markdown>{props.recipe}</Markdown>
            </div>
        </section>
    )
})

export default GeminiRecipe