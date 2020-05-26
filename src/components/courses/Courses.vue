<template>
    <div id='courses'>
        <v-app light>
            <h1>Your courses</h1>
            <v-container fill-height fluid>
                <!-- prikaz vseh tečajev -->
                <v-row align="center" justify="center">
                        <app-device v-for="(course, index) in courses" v-bind:key="course.index" :course="course" v-on:delete-course="deleteCourse(index)">></app-device>
                </v-row>
                <!-- okno za dodajanje tečaja -->
                <v-dialog v-model="dialog" persistent max-width="600px">

                    <!-- gumb za dodajanje tečaja -->
                    <template v-slot:activator="{ on }">
                        <v-btn fab dark large color="primary" fixed right bottom v-on="on">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                
                    <!-- naslov -->
                    <v-card-title>
                        <span class="headline">Add new course</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <!-- course provider field -->
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Course provider*" hint="eg. Coursera, Udemy,..." required v-model="courseInfo.courseProvider"></v-text-field>
                                </v-col>

                                <!-- course name filed -->
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Course name*" hint="eg. Intro to Programming,..." required v-model="courseInfo.courseName"></v-text-field>
                                </v-col>

                                <!-- course url filed -->
                                <v-col cols="12">
                                    <v-text-field label="Course URL*" required v-model="courseInfo.courseUrl"></v-text-field>
                                </v-col>

                                <!-- course start date -->
                                <v-col cols="12">
                                    <v-menu
                                        ref="startCourseDateMenu"
                                        v-model="startCourseDateMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="courseInfo.courseStartDate"
                                        transition="scale-transition"
                                        min-width="290px"
                                        offset-y>
                                

                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="courseInfo.courseStartDate"
                                                class="mt-3"
                                                label="Start Date*"
                                                dense
                                                readonly
                                                outlined
                                                hide-details
                                                required
                                                v-on="on"
                                            ></v-text-field>
                                        </template>


                                        <v-date-picker
                                            v-model="courseInfo.courseStartDate"
                                            no-title
                                            scrollable>

                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="startCourseDateMenu = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.startCourseDateMenu.save(courseInfo.courseStartDate)"> OK </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>

                                <!-- course status filed -->
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="['Ongoing', 'Ended']"
                                        label="Course status*"
                                        required
                                        v-model="courseInfo.courseStatus"
                                    ></v-select>
                                </v-col>


                                <!-- course payment type filed -->
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="['free', 'one-time', 'subscription']"
                                        label="Course Payment Method*"
                                        required
                                        v-model="courseInfo.coursePaymentType"
                                    ></v-select>
                                </v-col>

                            </v-row>
                        </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> 
                            <v-btn color="blue darken-1" text @click="onSubmitNewCourse">Save</v-btn> 
                        </v-card-actions>

                    </v-card>
                </v-dialog>
            </v-container>
        </v-app>
    </div>
</template>

<script>
import Course from "./CourseDetails.vue";
import axios from './../../axios-auth'
import router from '../../router'

export default {
    //želimo pridobiti course iz APija preko GET metode
    created(){
        axios.get('/courses', {headers: {'Authorization': 'Bearer ' + this.$store.state.idToken}})
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
            dialog: false,
            index: 0,
            startCourseDateMenu: false,
            courseInfo: {
                courseProvider: '',
                courseName: '',
                courseStartDate: '2020-06-10',
                courseStatus: '',
                courseUrl: '',
                coursePaymentType: ''
            }
        };
    },
    components: {
        appDevice: Course
    },
    methods: {
      onSubmitNewCourse () {
        this.dialog = false
        const newCourseFormData = {
          course_provider: this.courseInfo.courseProvider,
          course_name: this.courseInfo.courseName,
          course_start_date: this.courseInfo.courseStartDate,
          course_status: this.courseInfo.courseStatus,
          course_URL: this.courseInfo.courseUrl,
          course_payment_type: this.courseInfo.coursePaymentType,
        }
        axios.post('/courses', newCourseFormData, {headers: {'Authorization': 'Bearer ' + this.$store.state.idToken}})
            .then(res => {
                console.log(res)
                this.courses.push(newCourseFormData)
            })
            .catch(error => {
                console.log(error)
                alert("Error adding course! Please try later.")
            }) 
      },
      deleteCourse: function(index){
          this.courses.splice(index, 1);
      }
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