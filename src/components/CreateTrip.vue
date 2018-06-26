<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="columns">
                <div class="column is-half">
                    <h3 class="is-size-2 route-head">Create a trip</h3>
                    <h5 class="is-size-5"> Create a trip from the routes you frequently ply below</h5>
                    <hr>
                    <div class="box">
                        <div class="topcontent">
                            <h3 class="is-size-4">Registered Routes</h3>
                        </div>
                        <div class="columns">
                            <div class="column is-half" v-if="retrievedRoutes">
                                <div class="box " v-for="route in retrievedRoutes" @click="openRoute(route)">
                                    <div class="start">
                                        <img src="../assets/img/start.png" class="image is-8x8" alt="start">
                                        <p class="is-size-6">
                                            {{route.route_start_name}}
                                        </p>
                                    </div>
                                    <div class="stop">
                                        <img src="../assets/img/stop.png" class="image is-8x8" alt="stop">
                                        <p class="is-size-6">
                                            {{route.route_end_name}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a class="button is-myblue pull-right" @click="createRoute">Create Trip</a>

                    <div v-if="distanceCalc !== null && durationCalc !==null">
                        <p class="is-size-6">
                            Distance between {{ route.from.name }} & {{ route.to.name }} :
                            <span class="route-info">{{ distanceCalc.text }}</span>
                        </p>
                        <p class="is-size-6">
                            Usual Time Duration :
                            <span class="route-info">{{ durationCalc.text }}</span>
                        </p>
                    </div>

                </div>

                <div class="column is-half" v-show="route !== null">
                    <div class="box map">
                        <div class="topcontent">
                            <h3 class="is-size-4">Map Summary</h3>
                        </div>
                        <div id="map-canvas" />
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>
<script>
    import Navbar from '@/components/shared/Navbar';
    import Mapbox from 'mapbox-gl-vue';
    import Autocomplete from 'vue2-autocomplete-js';
    import {
        mapGetters
    } from 'vuex';

    export default {
        name: 'CreateTrip',
        components: {
            Mapbox,
            Autocomplete,
            Navbar
        },
        data() {
            return {
                retrievedRoutes: null,
                route: null,
                mapbox_key: 'pk.eyJ1IjoicGlldHJvc3BhcmtzIiwiYSI6ImNqaXAzNWdzMDBpY3MzdnFtY3I4MHVlZnMifQ.Nw1ZOn0QiQxiX66dL9lcfw',
                google_key: 'AIzaSyBD5iUv5_fX4wstCHO9pvHYYoLYAGgNULg',
                directionsService: null,
                directionsDisplay: null,
                distanceCalc: null,
                durationCalc: null,
                map: null,
                routes: null
            };
        },
        mounted() {
            this.directionsService = new google.maps.DirectionsService();
            this.directionsDisplay = new google.maps.DirectionsRenderer();
            this.getRoutes();
        },
        methods: {
            ...mapGetters(['user']),
            createRoute() {
                const routeBody = {
                    route_start: [
                        this.route.from.location.lat,
                        this.route.from.location.lng
                    ],
                    route_start_name: this.route.from.name,
                    route_end_name: this.route.to.name,
                    route_end: [this.route.to.location.lat, this.route.to.location.lng],
                    est_trip_length: this.durationCalc.text,
                    est_trip_duration: this.distanceCalc.text,
                    route_creator: this.user()._id
                };

                this.$axios
                    .post('http://localhost:5000/api/route', routeBody)
                    .then(resp => {
                        this.$toasted.success(resp.data.message).goAway(5000);
                    })
                    .catch(e => {
                        this.$toasted.error(err.response.data.message).goAway(5000);
                    });
            },
            processJSON(json) {
                return json.results;
            },
            processRouteFrom(data) {
                this.route.from = {
                    name: data.formatted_address,
                    location: data.geometry.location
                };
                if (this.route.from && this.route.to) {
                    this.calcRoute();
                    this.calcTime();
                } else this.routeFromMap(this.route.from);
            },
            processRouteTo(data) {
                this.route.to = {
                    name: data.formatted_address,
                    location: data.geometry.location
                };
                if (this.route.from && this.route.to) {
                    this.calcRoute();
                    this.calcTime();
                } else this.routeFromMap(this.route.to);
            },

            routeFromMap() {
                const location = {
                    lat: this.route.route_start[0],
                    lng: this.route.route_start[1]
                };
                var mapOptions = {
                    zoom: 16,
                    center: location
                };
                this.map = new google.maps.Map(
                    document.getElementById('map-canvas'),
                    mapOptions
                );
                this.directionsDisplay.setMap(this.map);
                var marker = new google.maps.Marker({
                    position: location,
                    map: this.map
                });
            },
            calcRoute() {
                const locationFrom = this.route.route_start;
                const locationTo = this.route.route_end;

                const start = new google.maps.LatLng(locationFrom[0], locationFrom[1]);
                const end = new google.maps.LatLng(locationTo[0], locationTo[1]);
                var request = {
                    origin: start,
                    destination: end,
                    travelMode: google.maps.TravelMode.DRIVING
                };

                this.directionsService.route(
                    request,
                    function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            this.directionsDisplay.setDirections(response);
                            this.directionsDisplay.setMap(this.map);
                        } else {
                            alert(
                                'Directions Request from ' +
                                start.toUrlValue(6) +
                                ' to ' +
                                end.toUrlValue(6) +
                                ' failed: ' +
                                status
                            );
                        }
                    }.bind(this)
                );
            },
            openRoute(route) {
                this.route = route;
                this.routeFromMap();
                this.calcRoute();
                
            },
            async getRoutes() {
                let routes = await this.$axios.get('http://localhost:5000/api/route');
                routes = routes.data.data;
                this.retrievedRoutes = routes;
            }
        }
    }
</script>
<style scoped>
    #map-canvas {
        margin-top: 20px;
        height: 300px;
        width: 100%;
    }

    .is-8x8 {
        width: 8px;
        height: 8px
    }

    .start img,
    .start p,
    .stop img,
    .stop p {
        display: inline-block !important;
        vertical-align: middle;
        margin: 2px;
    }

    .start img,
    .stop img {
        margin-right: 20px;
    }

    .container {
        margin-top: 20px
    }

    .route-head,
    .route-info {
        color: #108CCE !important;
    }

    .route-info {
        font-weight: 600 !important;
    }

    .is-mybluebg {
        background-color: #108CCE !important;
        color: white;
    }

    .topcontent {
        margin-top: 10px;
        margin-bottom: 10px;
        padding-bottom: 20px;
        border-bottom: 2px #eeeeee solid;
        color: #108CCE;
    }


    .box.map {
        margin-top: 115px;
    }

    label p {
        padding-top: 10px;
        padding-bottom: 10px;
        font-weight: 600
    }

    .autocomplete-change {

        width: 100% !important;
        height: 35px !important;
        border-radius: 5px !important;
        border: 1px solid #ecf0f1 !important;
    }
</style>