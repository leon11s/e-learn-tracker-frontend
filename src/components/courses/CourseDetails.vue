<template>
    <div id="course-details">
        <v-col>
            <v-card class="mx-auto" max-width="500">
                <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">

                <v-card-title>{{ course.course_name }}</v-card-title>
                </v-img>
            
                <v-card-subtitle class="pb-0">{{ course.course_provider }}</v-card-subtitle>
            
                <v-card-text class="text--primary">
                    <div>Start day: {{ course.course_start_date }}</div>
                    <div> URL: <a :href="course.course_URL">{{ course.course_URL }}</a></div>
                </v-card-text>
            
                <v-card-actions>
                    <v-col cols="12" sm="4" md="4">
                        <v-btn color="orange" text>
                            End course
                        </v-btn>
                    </v-col>
            
                    <v-col cols="12" sm="4" md="4">
                        <v-btn color="orange" text>
                            Show details
                        </v-btn>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                        <v-btn color="red" text @click="deleteCourse(); $emit('delete-course');">
                            Delete course
                        </v-btn>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-col>
    </div>
</template>

<script>
import axios from './../../axios-auth'

export default {
    props: ['course'],
    data(){
        return {
            course_id: this.course.course_id
        };
    },
    methods: {
        deleteCourse: function() {
            console.log(this.course.course_id)
            axios.delete('/courses/' + this.course.course_id, {headers: {'Authorization': 'Bearer ' + this.$store.state.idToken}})
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
                alert("Error removing course! Please reload and try later.")
            }) 
            
        }
    }

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