<template>
    <div class="col mb-4">
        <div class="card text-white bg-custom_device_card mb-3">
            <div class="card-header">{{ course.course_name }}</div>
            <div class="card-body">
            <h5 class="card-title">Provider: {{ course.course_provider }}</h5>
            <p class="card-text">Start date: {{ course.course_start_date }}</p>
            <p class="card-text">URL: {{ course.course_URL }}</p>
            <p class="card-text">Status: {{ course.course_status }}</p>
            <button type="button" class="btn btn-danger">End course</button>
            <button type="button" class="btn btn-warning">Show details</button>
        </div>
    </div>
    <!-- <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
        
        </div>  -->
    </div>
</template>

<script>
export default {
    props: ['course']
}
</script>

<style>
.bg-custom_device_card {
    background-color: #79bac1;
}

.card-text {
    text-align: left;
}
</style>