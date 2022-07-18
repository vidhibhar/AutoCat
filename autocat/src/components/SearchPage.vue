<template>
  <v-container>
    <div>
      <v-row>
        <!-- price -->
        <v-col>
          <v-menu :offset-y="8" bottom :close-on-content-click=false>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="" light v-bind="attrs" v-on="on"> Price </v-btn>
            </template>

            <v-list>
              <!-- <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item> -->
              <v-card flat color="transparent">
                <v-subheader>Price range</v-subheader>

                <v-card-text>
                  <v-row>
                    <v-col class="px-4">
                      <v-range-slider
                        v-model="rangePrice"
                        v-on:change="onPriceChange"
                        :max="max"
                        :min="min"
                        style="width: 400px"
                        hide-details
                        class="align-center"
                      >
                        <template v-slot:prepend>
                          <v-text-field
                            :value="rangePrice[0]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="$set(rangePrice, 0, $event)"
                          ></v-text-field>
                        </template>
                        <template v-slot:append>
                          <v-text-field
                            :value="rangePrice[1]"
                            class="mt-0 pt-0"
                            hide-details
                            single-line
                            type="number"
                            style="width: 60px"
                            @change="$set(rangePrice, 1, $event)"
                          ></v-text-field>
                        </template>
                      </v-range-slider>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-list>
          </v-menu>
        </v-col>

        <!-- make and model -->
        <v-col >
          <v-menu :offset-y="8" bottom :close-on-content-click=false light>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="" light v-bind="attrs" v-on="on">
                Make & Model
              </v-btn>
            </template>

              <v-list>
                <v-item-group mulitple value=[] v-on:change="onMakeSelected">
                  <v-container>
                    <v-row rows="3">
                      <v-col cols="5" md="2">
                        <v-item
                          v-for="make in makes"
                          v-bind:key="make.make"
                          v-slot="{ active, toggle }"
                          >
                            <v-chip
                              v-bind:key="make.make"
                              active-class="red--text"
                              :input-value="active"
                              @click="toggle"
                            >
                              {{ make.make }}
                            </v-chip>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-item-group>
              </v-list>
         </v-menu>
        </v-col>

        <!-- body type -->
        <v-col>
          <v-menu :offset-y="8" bottom :close-on-content-click=false>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="" light v-bind="attrs" v-on="on"> Body Type </v-btn>
            </template>

            <v-list>
              <v-container>
                <v-row>
                  <v-col style="width: 300px">
                    Style
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onStyleChange"
                      :items="styles"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Style"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                  <v-col style="width: 300px">
                    Door
                    <v-slider
                      v-model="slider"
                      v-on:change="onDoorsChange"
                      step="1"
                      class="align-center"
                      :max="doorMax"
                      :min="doorMin"
                      :default="4"
                      hide-details
                      style="width: 150px"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="slider"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col style="width: 300px">
                    Drive
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onDriveChange"
                      :items="driveWheels"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Drive"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                  <v-col style="width: 300px">
                    Seats
                    <v-slider
                      v-model="slider"
                      v-on:change="onSeatsChanged"
                      step="1"
                      class="align-center"
                      :max="seatsMax"
                      :min="seatsMin"
                      hide-details
                      style="width: 150px"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="slider"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                </v-row>
              </v-container>
            </v-list>
          </v-menu>
        </v-col>

        <!-- features -->
        <v-col>
          <v-menu :offset-y="8" bottom :close-on-content-click=false>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="" light v-bind="attrs" v-on="on"> Features </v-btn>
            </template>

            <v-list>
              <v-container>
                <v-row>
                  <v-col style="width: 300px">
                    Safety
                    <v-slider
                      v-model="slider"
                      v-on:change="onSafetyChange"
                      step="1"
                      class="align-center"
                      :max="safetyMax"
                      :min="safetyMin"
                      hide-details
                      style="width: 150px"
                    >
                      <template v-slot:append>
                        <v-text-field
                          v-model="slider"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                        ></v-text-field>
                      </template>
                    </v-slider>
                  </v-col>
                  <v-col style="width: 300px">
                    Fuel
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onFuelChange"
                      :items="fuelTypes"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Fuel Type"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="width: 300px">
                    City MPG
                    <v-range-slider
                      v-model="rangeCity"
                      v-on:change="onCityMPGChange"
                      :max="cityMax"
                      :min="cityMin"
                      hide-details
                      class="align-center"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="rangeCity[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeCity, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="rangeCity[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeCity, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                  <v-col style="width: 300px">
                    Highway MPG
                    <v-range-slider
                      v-model="rangeHighway"
                      v-on:change="onHighwayMPGChange"
                      :max="highwayMax"
                      :min="highwayMin"
                      hide-details
                      class="align-center"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="rangeHighway[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeHighway, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="rangeHighway[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeHighway, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="width: 300px">
                    Horsepower
                    <v-range-slider
                      v-model="rangeHorsepower"
                      v-on:change="onHorsepowerChange"
                      :max="horsepowerMax"
                      :min="horsepowerMin"
                      hide-details
                      class="align-center"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="rangeHorsepower[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeHorsepower, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="rangeHorsepower[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(rangeHorsepower, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                  <v-col style="width: 300px">
                    Cylinders
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onCylindersChange"
                      :items="cylinderTypes"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Cylinders"
                      multiple
                    ></v-autocomplete>
                    <!-- <v-autocomplete
                      v-model="values"
                      v-on:change="onFuelChange"
                      :items="fuelTypes"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Fuel Type"
                      multiple
                    ></v-autocomplete> -->
                  </v-col>
                </v-row>

                <v-row>
                  <v-col style="width: 300px">
                    Engine Size
                    <v-autocomplete
                      v-model="values"
                      v-on:change="onEngineSizeChange"
                      :items="engineSizes"
                      outlined
                      dense
                      chips
                      small-chips
                      label="Engine Size"
                      multiple
                    ></v-autocomplete>
                  </v-col>
                  <v-col style="width: 300px">
                    Engine Location
                    <v-container fluid>
                      <v-checkbox
                        v-model="selected"
                        label="Front"
                        value="front"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="Back"
                        value="back"
                      ></v-checkbox>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-list>
          </v-menu>
        </v-col>
        <v-col>
          <v-btn
            v-on:click="searchCars"
            depressed
            color="error"
            elevation="1"
            
          >Search</v-btn>
          
        </v-col>
        
      </v-row>
    </div>


    <template>
    <v-container fluid>
      <v-row dense align="stretch">
        <v-col 
          cols="12" 
          sm="4"
          v-for="(car, index) in carResults"
          v-bind:key="index"
        >
          <v-card
            :loading="loading"
            class="mx-auto my-12 pa-2"
            max-width="300"
          >

        <v-img
          height="200"
          width="300"
          :src="getImgUrl(car.make, car.model)" v-bind:alt="car.make"
          
          
        ></v-img>

        <v-card-title>{{car.make || "Car Make"}} {{ car.model || "Car Model" }} </v-card-title>

        <v-card-text>
          <v-row
            class="mx-0"
          >
            <v-rating
              :value="car.safety_rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ms-4">
              Safety Rating
            </div>
          </v-row>

          <div class="my-4 text-subtitle-1">
            $ • {{car.price}}
          </div>

          <div>

            Website: <a>{{car.image_url}}</a>
          </div>
        </v-card-text>
      </v-card>
      </v-col>


      </v-row>

    </v-container>
    </template>
  </v-container>
</template>


<script>
import { searchCars, getMakes, getCars, getStyles, getDriveWheels, getFuelTypes , getCylinderTypes, getEngineSizes} from '../api/api'

export default {
  name: "SearchPage",

  data: () => ({
    range: [10, 50],
    rangePrice: [0, 100000],
    rangeCity: [0, 100],
    rangeHighway: [0, 100],
    rangeHorsepower: [0, 300],
    min: 0,
    max: 100000,
    doorMin: 2,
    doorMax: 4,
    seatsMin: 2,
    seatsMax: 7,
    safetyMin: 0,
    safetyMax: 5,
    cityMin: 0,
    cityMax: 100,
    highwayMin: 0,
    highwayMax: 100,
    horsepowerMin: 0,
    horsepowerMax: 300,
    makes: [{make: "Ford"}],
    styles: [{"body_style": "Sedan"}],
    fuelTypes: [{"fuel_type": "Gas"}],
    cylinderTypes: [{"cylinders":3}],
    engineSizes: [{"engine_size":4}],
    driveWheels: [],
    carResults: [],
    // styles: [],
    filters: {
      priceMin: 0,
      priceMax: 100000,
      doorsMin: 2,
      seatsMin: 4,
      safetyMin: 4,
      make: [],
    }
  }),

  methods: {
    async searchCars(){
      console.log(this.filters)
      const cars = await searchCars(this.filters);
      this.carResults.splice(0, this.carResults.length);
      this.carResults = cars.result;
      console.log(cars);
    },
    
    async getMakes() {
      const makes = await getMakes();
      this.makes = makes.result;
    },

    async getStyles() {
      const styles= await getStyles();
      this.styles = styles.result.map(s => s.body_style.toUpperCase());
    },

    async getFuelTypes() {
      const fuel = await getFuelTypes();
      this.fuelTypes = fuel.result.map(x => x.fuel_type);
    },

    async getDriveWheels() {
      const drives = await getDriveWheels();
      this.driveWheels = drives.result.map(x => x.drive_wheel.toUpperCase());
    },

    async getCylinderTypes() {
      const cylinders = await getCylinderTypes();
      this.cylinderTypes = cylinders.result.map(x => x.cylinders)
    },

    async getEngineSizes() {
      const sizes = await getEngineSizes();
      console.log(sizes)
      this.engineSizes = sizes.result.map(x => x.engine_size)
    },

    onMakeSelected(event) {
      const makeText = this.makes[event].make;
      this.filters.make = makeText;
    },

    onPriceChange(range){
      this.filters.priceMin = range[0];
      this.filters.priceMax = range[1];
    },

    onDoorsChange(value){
      this.filters.doorsMin = value;
      console.log(this.filters);
    },

    onSeatsChange(value){
      this.filters.seatsMin = value;
    },

    onSafetyChange(value) {
      this.filters.safetyMin = value;
    },

    onCityMPGChange(range) {
      this.filters.cityMin = range[0];
      this.filters.cityMax = range[1];
    },

    onHighwayMPGChange(range) {
      this.filters.highwayMin = range[0];
      this.filters.highwayMax = range[1];
    },

    onHorsepowerChange(range) {
      this.filters.horsepowerMin = range[0];
      this.filters.horsepowerMax = range[1];
    },

    onStyleChange(value){
      this.filters.style = value.join(",").toLowerCase();
    },

    onDriveChange(value){
      this.filters.driveWheel = value.join(",").toLowerCase();
    },

    onFuelChange(value){
      this.filters.fuelType = value;
    },

    onCylindersChange(value){
        this.filters.cylinders = value;
    },

    onEngineSizeChange(value){
        this.filters.engineSize = value;
    },
    
    // NOT SURE IF THIS WORKS
    async filterCars() {
      const cars = await getCars();
      this.cars = cars.result;
    },

    getImgUrl(make, model) {
      var images = require.context("../assets/car_imgs", false, /.jpg/);
      return images("./" + make + "_" + model + ".jpg");
    },

  },

  created() {
    this.searchCars();
    this.getMakes();
    this.getStyles();
    this.getFuelTypes();
    this.getDriveWheels();
    this.getCylinderTypes();
    this.getEngineSizes();
    this.filterCars();
  }
};
</script>
