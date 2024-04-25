<script>
    import { fade, fly } from "svelte/transition";
    import { score } from "./store";
    import Question from "./Question.svelte";
    import Modal from "./Modal.svelte";

    let quiz = getQuiz();
    let activeQuestion = 0;
    let isModalOpen = false;


    async function getQuiz() {
        const res = await fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple")
        const quiz = await res.json()
        return quiz
    }

    function nextQuestion() {
        activeQuestion += 1;
    }

    function resetQuiz() {
        isModalOpen = false;
        score.set(0);
        activeQuestion = 0;
        quiz = getQuiz();
    }

    $: if ($score > 7 ) {
        isModalOpen = true;
    }

    //Reactive declaration
    $: questionNumber = activeQuestion + 1;

</script>

<div>
    <button on:click={resetQuiz}>Start ew quiz</button>

    <h3>My Score: {$score}</h3>
    <h4>Question #{questionNumber}</h4>


    {#await quiz}
        loading...
    {:then data} 
        {#each data.results as question, index }
            {#if index === activeQuestion}
            <div in:fly={{x: 100}} out:fly={{ x: -200}}   class="fade-wrapper">
                <Question 
                {nextQuestion} 
                {question} 
                />
            </div>
            {/if}
        {/each}
    {/await}
</div>

{#if isModalOpen}
    <Modal on:close={resetQuiz}>
        <h2>You won!</h2>
        <p>Congratulations Your score is {score}</p>
        <button on:click={resetQuiz}>Start Over</button>
    </Modal>
{/if}

                
<style>
    .fade-wrapper {
        position: absolute;
        /* transition: opacity 0.5s; */
    }
</style>