<script lang="ts">
    import { fly, fade } from "svelte/transition";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

</script>

<style>
    .modal-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background-color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

</style>

<!-- {#if isOpen} -->
    <div class="modal-bg" transition:fade>
        <div class="modal" transition:fly={{y: 100}} >
            <button class="close" on:click={() => dispatch('close')}>Close</button>
            <slot />
        </div>
    </div>
<!-- {/if} -->
