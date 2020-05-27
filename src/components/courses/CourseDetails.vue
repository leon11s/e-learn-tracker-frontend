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
                    <!-- zaključi tečaj -->
                    <v-col cols="12" sm="4" md="4">
                        <v-btn color="orange" text>
                            End course
                        </v-btn>
                    </v-col>
            
                    <!-- prikaži podrobnosti o tečaju -->
                    <v-col cols="12" sm="4" md="4">
                        <!-- gumb za prikaz podrobnosti -->
                        <v-btn color="orange" text @click="dialog_show_details = true"> Show details </v-btn>

                        <!-- DIALOG za prikaz podrobnosti -->
                        <v-dialog v-model="dialog_show_details" persistent max-width="600px">
                            <!-- vsebina -->
                            <v-card>
                                <!-- naslov -->
                                <v-card-title>
                                    <span class="headline">Course Details: {{ course.course_name }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <div><b>Course provider: </b> {{course.course_provider}}</div>
                                        </v-row>
                                        <v-row>
                                            <div><b>Course start date: </b> {{course.course_start_date}}</div>
                                        </v-row>
                                        <v-row>
                                            <div><b>Course status: </b> {{course.course_status}}</div>
                                        </v-row>
                                        <v-row>
                                            <div><b>Course URL: </b> <a :href="course.course_URL">{{ course.course_URL }}</a></div>
                                        </v-row>
                                        <v-row>
                                            <div><b>Course payment type: </b> {{course.course_payment_type}}</div>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                 <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="dialog_edit = true">EDIT</v-btn>
                                    
                                    <!-- DIALOG: urejanje tečaja -->
                                    <v-dialog v-model="dialog_edit" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
                                        <v-card tile>
                                            <!-- naslovna vrstica -->
                                            <v-toolbar  dark color="primary">
                                                <v-btn icon dark @click="dialog_edit = false"><v-icon>mdi-close</v-icon></v-btn>
                                                <v-toolbar-title>Settings</v-toolbar-title>
                                                <v-spacer></v-spacer>
                                                <v-toolbar-items>
                                                    <v-btn dark text @click="saveEditCourse">Save</v-btn>
                                                </v-toolbar-items>
                                            </v-toolbar>
                                            <!-- vsebina dialoga za editiranje -->
                                            <v-card-text>
                                                <v-list three-line subheader>
                                                    <v-spacer></v-spacer>
                                                    <v-subheader>Edit the fileds you want and click Save.</v-subheader>
                                                    <!-- course name -->
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>Course name</v-list-item-title>
                                                            <v-list-item-subtitle>
                                                                <v-text-field label="Course name*" :placeholder="course.course_name" hint="eg. Intro to Programming,..." required v-model="course.course_name"></v-text-field>
                                                            </v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-spacer></v-spacer>
                                                    
                                                    <!-- course provider -->
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>Course provider</v-list-item-title>
                                                            <v-list-item-subtitle>
                                                                <v-text-field label="Course provider*" :placeholder="course.course_provider" hint="eg. Coursera, Udemy,..." required v-model="course.course_provider"></v-text-field>
                                                            </v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-spacer></v-spacer>

                                                    <!-- course url -->
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>Course URL</v-list-item-title>
                                                            <v-list-item-subtitle>
                                                                <v-text-field label="Course URL*" :placeholder="course.course_URL"  required v-model="course.course_URL"></v-text-field>
                                                            </v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-spacer></v-spacer>

                                                    <!-- course start date -->
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title>Course start date</v-list-item-title>
                                                            <v-list-item-subtitle>
                                                                <v-menu
                                                                    ref="startCourseDateMenu"
                                                                    v-model="startCourseDateMenu"
                                                                    :close-on-content-click="false"
                                                                    :nudge-right="40"
                                                                    :return-value.sync="course.course_start_date"
                                                                    transition="scale-transition"
                                                                    min-width="290px"
                                                                    offset-y>
                                                            

                                                                    <template v-slot:activator="{ on }">
                                                                        <v-text-field
                                                                            v-model="course.course_start_date"
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
                                                                        v-model="course.course_start_date"
                                                                        no-title
                                                                        scrollable>

                                                                        <v-spacer></v-spacer>
                                                                        <v-btn text color="primary" @click="startCourseDateMenu = false">Cancel</v-btn>
                                                                        <v-btn text color="primary" @click="$refs.startCourseDateMenu.save(course.course_start_date)"> OK </v-btn>
                                                                    </v-date-picker>
                                                                </v-menu>
                                                            </v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-spacer></v-spacer>

                                                    <!-- course status filed -->
                                                    <v-list-item>
                                                        <v-col cols="12" sm="6">
                                                            <v-list-item-content>
                                                                <v-list-item-title>Course status filed</v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    <v-select
                                                                        :items="['Ongoing', 'Ended', 'Archived']"
                                                                        label="Course status*"
                                                                        required
                                                                        v-model="course.course_status"
                                                                    ></v-select>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-col>
                                                        <v-col cols="12" sm="6">
                                                            <v-list-item-content>
                                                                <v-list-item-title>Course payment method</v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    <v-select
                                                                        :items="['free', 'one-time', 'subscription']"
                                                                        label="Course Payment Method*"
                                                                        required
                                                                        v-model="course.course_payment_type"
                                                                    ></v-select>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                        </v-col>
                                                    </v-list-item>
                                                    <v-spacer></v-spacer>
                                                </v-list>
                                            </v-card-text>
                                            <div style="flex: 1 1 auto;"></div>
                                        </v-card>   
                                    </v-dialog>
                                    <v-btn color="blue darken-1" text @click="dialog_show_details = false">CLOSE</v-btn> 
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                        <v-btn color="red" text @click="deleteCourse();">
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
    data(){
        return {
            dialog_edit: false,
            dialog_show_details: false,
            startCourseDateMenu: false,
        };
    },
    props: ['course'],
    methods: {
        deleteCourse() {
            this.$store.dispatch('deleteCourse', this.course.course_id)
        },
        saveEditCourse(){
            this.dialog_edit = false; 
            this.dialog_show_details = false;
            const editCourseFormData = {
              course_provider: this.course.course_provider,
              course_name: this.course.course_name,
              course_start_date: this.course.course_start_date,
              course_status: this.course.course_status,
              course_URL: this.course.course_URL,
              course_payment_type: this.course.course_payment_type,
            }

            const updateData = {
                course_id: this.course.course_id,
                data: editCourseFormData
            }

            console.log(editCourseFormData)
            this.$store.dispatch('updateCourse', updateData)
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