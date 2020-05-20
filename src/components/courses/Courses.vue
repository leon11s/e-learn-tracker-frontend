<template>
    <div>
        <h1>That's the courses dashboard!</h1>
        <p>You should only get here if you're authenticated!</p>
        <div class="row row-cols-1 row-cols-md-3">
            <app-device v-for="course in courses" v-bind:key="course.course_id" :course="course"></app-device>
        </div>
    </div>
</template>

<script>
import Course from "./CourseDetails.vue";
import axios from 'axios';

export default {
    //želimo pridobiti course iz APija preko GET metode
    created(){
        axios.get('/courses')
            .then(res => {
                console.log(res);
                const data = res.data
                const courses = [];
                for (let key in data){
                    courses.push(data[key]);
                } 
                console.log(courses);
                this.courses = courses
            })
            .catch(error => console.log(error))
    },

    data(){
        return {
            courses: [],
        };
    },
    components: {
        appDevice: Course
    }
}
</script>

<style>
  h1 {
    text-align: center;
  }

  p {
    color: black;
    text-align: center;
  }
</style>