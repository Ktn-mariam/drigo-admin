"use client"
import { useState, useEffect, useRef } from 'react'

type BrandType = {
  id: number,
  name: string,
  isActive: boolean,
  carCount: number,
  createdAt: string,
  logoUrl: string,
  thumbnailUrl: string,
  mediumUrl: string
}

type Model = {
  id: number,
  brandId: number,
  name: string,
  seats: number,
  maxSpeed: number,
  bodyType: {
    id: number,
    name: string
  },
  createdAt: string
}

type ColorType = {
  id: number,
  brandId: number,
  name: string,
  code: string,
  hexCode: string,
  createdAt: string
}

type FuelType = {
  id: number,
  name: string,
  createdAt: string
}

type FeatureType = {
  id: number,
  name: string,
  icon: string | null
}

type CityType = {
  id: number,
  name: string,
  countryId: number
}

type ParkingZoneType = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  radiusMeters: number,
  isFree: boolean,
  createdAt: string,
}

type GasStationType = {
  id: number,
  name: string,
  brand: string,
  latitude: number,
  longitude: number,
  createdAt: string
}


function AddCar() {
  const [brands, setBrands] = useState<BrandType[] | null>(null)
  const [fuelTypes, setFuelTypes] = useState<FuelType[] | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null)
  const [models, setModels] = useState<Model[] | null>(null)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [colors, setColors] = useState<ColorType[] | null>(null)
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null)
  const [features, setFeatures] = useState<FeatureType[] | null>(null)
  const [cities, setCities] = useState<CityType[] | null>(null)
  const [parkingZones, setParkingZones] = useState<ParkingZoneType[] | null>(null)
  const [gasStations, setGasStations] = useState<GasStationType[] | null>(null)

  useEffect(() => {
    const fetchAllBrands = async () => {
      const firstResponse = await fetch(
        "http://localhost:4000/api/admin/brands?page=1", { credentials: "include" }
      );

      const firstData = await firstResponse.json();
      console.log(firstData);


      let allBrands = [...firstData.data];
      const totalPages = firstData.total / firstData.pageSize;

      for (let page = 2; page <= totalPages; page++) {
        const response = await fetch(
          `http://localhost:4000/api/admin/brands?page=${page}`, { credentials: "include" }
        );

        const data = await response.json();

        allBrands = [...allBrands, ...data.data];
      }

      setBrands(allBrands);
    };

    const fetchFuelType = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/cars/fuel-types`, { credentials: "include" });
        const data = await response.json();
        console.log('Fuel Type data:', data);
        setFuelTypes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchFeatures = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/cars/car-features`, { credentials: "include" });
        const data = await response.json();
        console.log('Feature data:', data);
        setFeatures(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/cities`, { credentials: "include" });
        const data = await response.json();
        console.log('City data:', data);
        setCities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchParkingZones = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/parkingZones`, { credentials: "include" });
        const data = await response.json();
        console.log('Parking Zone data:', data);
        setParkingZones(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchGasStations = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/gasStations`, { credentials: "include" });
        const data = await response.json();
        console.log('Gas Station data:', data);
        setGasStations(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllBrands();
    fetchFuelType();
    fetchFeatures();
    fetchCities();
    fetchParkingZones();
    fetchGasStations();
  }, []);


  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/brands/${selectedBrand?.id}/models`, { credentials: "include" });
        const data = await response.json();
        console.log('Model data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setModels(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (selectedBrand) {
      fetchModels();
      setSelectedModel(null)
    }
  }, [selectedBrand]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/brands/${selectedBrand?.id}/colors`, { credentials: "include" });
        const data = await response.json();
        console.log('Color data:', data);

        // if (data.status === 401) {
        //   router.push('/login');
        // }

        setColors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (selectedBrand) {
      fetchColors();
      setSelectedModel(null)
    }
  }, [selectedBrand]);

  const setBrandBasedOnId = (selectedBrandId: number) => {
    if (brands) {
      const selectedBrand = brands.filter((brand) => {
        return brand.id === selectedBrandId
      })[0]

      console.log(selectedBrand);

      setSelectedBrand(selectedBrand)
    }
  }

  const setModelBasedOnId = (selectedModelId: number) => {
    if (models) {
      const selectedModel = models.filter((model) => {
        return model.id === selectedModelId
      })[0]

      console.log(selectedModel);

      setSelectedModel(selectedModel)
    }
  }

  const setcolorBasedOnId = (selectedcolorId: number) => {
    if (colors) {
      const selectedColor = colors.filter((color) => {
        return color.id === selectedcolorId
      })[0]

      console.log(selectedColor);

      setSelectedColor(selectedColor)
    }
  }

  return (
    <div className='mx-20 my-10 flex flex-col gap-3'>
      <h1 className='font-semibold text-3xl'>Add Car</h1>
      <div className='w-full flex gap-36'>
        <div className='w-1/2 flex flex-col gap-3'>
          <div className='flex gap-5 w-full'>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="">Brand:</label>
              <select className='px-2 py-1 border-2 border-gray-300 rounded-md' name="" id="" onChange={(e) => setBrandBasedOnId(Number(e.target.value))}>
                <option value={selectedBrand?.id || ""}>Select Brand</option>
                {brands && brands.map((brand, index) => {
                  return <option value={brand.id} key={index}>{brand.name}</option>
                })}
              </select>
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="">Model:</label>
              <select className='px-2 py-1 border-2 border-gray-300 rounded-md' name="" value={selectedModel?.id || ""} id="" onChange={(e) => setModelBasedOnId(Number(e.target.value))}>
                <option value="">Select Model</option>
                {models && models.map((model, index) => {
                  return <option value={model.id} key={index}>{model.name}</option>
                })}
              </select>
            </div>
          </div>
          <div className='w-full flex gap-5'>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="">Color:</label>
              <select className='px-2 py-1 border-2 border-gray-300 rounded-md' name="" value={selectedColor?.id || ""} id="" onChange={(e) => setcolorBasedOnId(Number(e.target.value))}>
                <option value="">Select Color</option>
                {colors && colors.map((color, index) => {
                  return <option value={color.id} key={index}>{color.name}</option>
                })}
              </select>
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="">Manufacture Year:</label>
              <input
                type="number"
                name="year"
                placeholder="Ex: 2020"
                min={2000}
                max={new Date().getFullYear() + 1}
                className="px-2 py-1 border-2 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <h2 className='font-semibold text-lg mt-5'>Engine and Performance</h2>
            <div className='w-full flex gap-5'>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Engine Capacity:</label>
                <input
                  type="number"
                  name="capacity"
                  placeholder="Ex: 2.0"
                  min={0}
                  className="px-2 py-1 border-2 border-gray-300 rounded-md"
                />
              </div>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Engine Unit:</label>
                <input
                  type="text"
                  name="unit"
                  placeholder="Ex: L"
                  className="px-2 py-1 border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col'>
            <div className='w-full flex gap-5'>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Max Speed:</label>
                <input
                  type="number"
                  name="maxSpeed"
                  placeholder="Ex: 100"
                  min={0}
                  className="px-2 py-1 border-2 border-gray-300 rounded-md"
                />
              </div>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Transmission:</label>
                <input
                  type="number"
                  name="transmission"
                  placeholder="Ex: 100"
                  min={0}
                  className="px-2 py-1 border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className='font-semibold text-lg mt-5'>Fuel and Range</h2>
            <div className='w-full flex gap-5'>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Engine Capacity:</label>
                <input
                  type="number"
                  name="capacity"
                  placeholder="Ex: 2.0"
                  min={0}
                  className="px-2 py-1 border-2 border-gray-300 rounded-md"
                />
              </div>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Fuel Type:</label>
                <select className='px-2 py-1 border-2 border-gray-300 rounded-md' name="fuelType"
                // value={selectedFuelType?.id || ""} id="" onChange={(e) => setFuelTypeBasedOnId(Number(e.target.value))}
                >
                  <option value="">Select Fuel Type</option>
                  {fuelTypes && fuelTypes.map((fuelType, index) => {
                    return <option value={fuelType.id} key={index}>{fuelType.name}</option>
                  })}
                </select>
              </div>
            </div>
            <div className='w-full flex flex-col mt-3'>
              <div className='w-full flex gap-5'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Fuel Percentage:</label>
                  <input
                    type="number"
                    name="fuelPercentage"
                    placeholder="Ex: 80"
                    min={0}
                    max={100}
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Fuel Tank Capacity:</label>
                  <input
                    type="text"
                    name="fuelTankCapacity"
                    placeholder="Ex: 50"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className='w-full flex flex-col mt-3'>
              <div className='w-full flex gap-5'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Distance in km:</label>
                  <input
                    type="number"
                    name="distance"
                    placeholder="Ex: 100"
                    min={0}
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='w-1/2'></div>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col gap-3'>
            <div>
              <h2 className='font-semibold text-lg mt-5'>Vehicle Identification</h2>
              <div className='w-full flex gap-5'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Plate Number:</label>
                  <input
                    type="text"
                    name="plateNumber"
                    placeholder="Ex: E4350873"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Chassis Number:</label>
                  <input
                    type="text"
                    name="chassisNumber"
                    placeholder="Ex: 1HGBH41JXMN109186"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className='w-full flex gap-5'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">TARS Vehicle Identifier:</label>
                  <input
                    type="text"
                    name="tarsVehicleIdentifier"
                    placeholder="Ex: did:tars:otZ8Kko27zNW"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Imei:</label>
                  <input
                    type="text"
                    name="imei"
                    placeholder="Ex: 123456789012345"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className='mt-5 flex flex-col gap-3'>
              <div>
                <h2 className='font-semibold text-lg'>Location</h2>
                <div className='w-full flex gap-5'>
                  <div className='flex flex-col w-1/2'>
                    <label htmlFor="">Latitude:</label>
                    <input
                      type="number"
                      name="latitude"
                      placeholder="Ex: 25.065963"
                      className="px-2 py-1 border-2 border-gray-300 rounded-md"
                    />
                  </div>
                  <div className='flex flex-col w-1/2'>
                    <label htmlFor="">Longitude:</label>
                    <input
                      type="number"
                      name="longitude"
                      placeholder="Ex: 55.396681"
                      className="px-2 py-1 border-2 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className='w-full flex gap-5'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Address:</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Ex: 123 Main St"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">City:</label>
                  <select className='px-2 py-1 border-2 border-gray-300 rounded-md' name="city"
                  // value={selectedColor?.id || ""} id="" onChange={(e) => setcolorBasedOnId(Number(e.target.value))}
                  >
                    <option value="">Select City</option>
                    {cities && cities.map((city, index) => {
                      return <option value={city.id} key={index}>{city.name}</option>
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2 flex flex-col gap-3'>
          <div>
            <h2 className='font-semibold text-lg'>Features</h2>
            <div className='w-full flex flex-col gap-3'>
              <p>Select Features applicable to the car:</p>
              <div className='grid grid-cols-2 gap-3'>
                {features && features.map((feature, index) => {
                  return (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                      // onChange={(e) => setHasCarplay(e.target.checked)}
                      />
                      {feature.name}
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <h2 className='font-semibold text-lg'>End Trip Cities</h2>
            <div className='w-full flex flex-col gap-3'>
              <p>Select end Trip Available Cities:</p>
              <div className='grid grid-cols-2 gap-3'>
                {cities && cities.map((city, index) => {
                  return (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                      // onChange={(e) => setHasCarplay(e.target.checked)}
                      />
                      {city.name}
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <h2 className='font-semibold text-lg'>Included Parking Zones</h2>
            <div className='w-full flex flex-col gap-3'>
              <p>Select Included Parking Zones:</p>
              <div className='grid grid-cols-2 gap-3'>
                {parkingZones && parkingZones.map((zone, index) => {
                  return (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                      // onChange={(e) => setHasCarplay(e.target.checked)}
                      />
                      {zone.name}
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <h2 className='font-semibold text-lg'>Included Gas Stations</h2>
            <div className='w-full flex flex-col gap-3'>
              <p>Select Included Gas Stations:</p>
              <div className='grid grid-cols-2 gap-3'>
                {gasStations && gasStations.map((station, index) => {
                  return (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                      // onChange={(e) => setHasCarplay(e.target.checked)}
                      />
                      {station.name}
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AddCar
