<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    position: {
        type: String,
        default: 'top',
        validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value)
    },
    delay: {
        type: Number,
        default: 200
    },
    width: {
        type: String,
        default: 'auto'
    },
    dark: {
        type: Boolean,
        default: true
    }
});

const tooltipVisible = ref(false);
const tooltipEl = ref(null);
const timeout = ref(null);

const tooltipClasses = computed(() => {
    const baseClasses = 'absolute z-50 px-2 py-1 text-xs font-medium rounded shadow-sm whitespace-nowrap';
    const colorClasses = props.dark
        ? 'text-white bg-gray-900 dark:bg-gray-800'
        : 'text-gray-900 bg-white border border-gray-200 dark:text-white dark:bg-gray-700 dark:border-gray-600';

    const positionClasses = {
        'top': 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 mb-1',
        'right': 'left-full top-1/2 transform translate-x-1 -translate-y-1/2 ml-1',
        'bottom': 'top-full left-1/2 transform -translate-x-1/2 translate-y-1 mt-1',
        'left': 'right-full top-1/2 transform -translate-x-1 -translate-y-1/2 mr-1'
    };

    return `${baseClasses} ${colorClasses} ${positionClasses[props.position]}`;
});

const arrowClasses = computed(() => {
    const baseClasses = 'absolute border-4 border-transparent';

    const positionClasses = {
        'top': 'left-1/2 top-full -translate-x-1/2 border-t-current',
        'right': 'top-1/2 right-full -translate-y-1/2 border-r-current',
        'bottom': 'left-1/2 bottom-full -translate-x-1/2 border-b-current',
        'left': 'top-1/2 left-full -translate-y-1/2 border-l-current'
    };

    return `${baseClasses} ${positionClasses[props.position]}`;
});

const arrowColor = computed(() => {
    return props.dark ? 'text-gray-900 dark:text-gray-800' : 'text-white dark:text-gray-700';
});

const tooltipStyles = computed(() => {
    return props.width !== 'auto' ? { width: props.width, maxWidth: '24rem' } : { maxWidth: '16rem' };
});

const showTooltip = () => {
    clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
        tooltipVisible.value = true;
    }, props.delay);
};

const hideTooltip = () => {
    clearTimeout(timeout.value);
    tooltipVisible.value = false;
};

onMounted(() => {
    // Touch device support
    const parentEl = tooltipEl.value?.parentElement;
    if (parentEl) {
        parentEl.addEventListener('touchstart', showTooltip, { passive: true });
        parentEl.addEventListener('touchend', hideTooltip);
    }
});

onBeforeUnmount(() => {
    clearTimeout(timeout.value);

    // Clean up touch event listeners
    const parentEl = tooltipEl.value?.parentElement;
    if (parentEl) {
        parentEl.removeEventListener('touchstart', showTooltip);
        parentEl.removeEventListener('touchend', hideTooltip);
    }
});
</script>

<template>
    <div ref="tooltipEl" class="inline-block relative" @mouseenter="showTooltip" @mouseleave="hideTooltip"
        @focusin="showTooltip" @focusout="hideTooltip">
        <slot></slot>
        <transition name="tooltip-fade">
            <div v-if="tooltipVisible" :class="tooltipClasses" :style="tooltipStyles" role="tooltip" aria-live="polite">
                {{ text }}
                <!-- Triangle pointer -->
                <div :class="[arrowClasses, arrowColor]"></div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
    opacity: 0;
    transform: scale(0.65);
}

/* Fix whitespace issues when used inline */
.inline-block {
    vertical-align: middle;
}
</style>