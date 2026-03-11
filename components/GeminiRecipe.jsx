import Markdown from "react-markdown"
export default function GeminiRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Gemini Recommends:</h2>
            <div className="recipe-content">
                <Markdown>{props.recipe}</Markdown>
            </div>
        </section>
    )
}