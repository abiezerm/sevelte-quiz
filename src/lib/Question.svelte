<script lang="ts">
    import { score } from "./store";
    import type { Question } from "./interfaces";

    export let question: Question;
    export let nextQuestion: () => void;
    
    let isCorrect: boolean;
    let isAnswered: boolean = false;

    let answers = [
        ...question.incorrect_answers.map((answer) => {
            return {answer, correct: false}
        }), 
        {
            answer: question.correct_answer,
            correct: true
        },
    ];

    shuffle(answers);

    function shuffle(array: {answer: string, correct: boolean}[]) {
        array.sort(() => Math.random() - 0.5);
    }

    function checkQuestion(val: boolean) {
        // const correct = answers.find((answer) => answer.correct);
        // console.log(correct);
        if(isAnswered) return;
        if(val)  score.update((val) => val += 1);
        isCorrect = val;
        isAnswered = true;
    }
</script>

<h3>{@html question.question}</h3>

{#if isAnswered}
    <h5 class={isCorrect ? 'correct' : 'wrong'}>{#if isCorrect}You got it right!{:else} You goofed up {/if}</h5>
{/if}

{#each answers as answer}
    <button on:click={() => checkQuestion(answer.correct)}>{@html answer.answer}</button>

{/each}

{#if isAnswered}
    <div>
        <button on:click={nextQuestion}>Next Question</button>
    </div>
{/if}

<style>
    h5 {
        color: blueviolet
    }

    h5.correct {
        color: green;
    }

    h5.wrong {
        color: red;
    }
</style>
