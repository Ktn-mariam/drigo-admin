"use client"
import { CarDetailType } from '@/types/Car'
import { useState, useEffect, useRef, useContext } from 'react'
import { useRouter } from "next/navigation";
import ToastNotificationsContext from '@/context/toastNotification';

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


function CarForm({ isEditForm, carId, initialValues }: { isEditForm: boolean, carId?: string, initialValues?: CarDetailType }) {
  const router = useRouter()
  const { showToast } = useContext(ToastNotificationsContext);

  const [brands, setBrands] = useState<BrandType[] | null>(null)
  const [fuelTypes, setFuelTypes] = useState<FuelType[] | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null)
  const [models, setModels] = useState<Model[] | null>(null)
  const [selectedModelId, setSelectedModelId] = useState<number | "">(initialValues?.modelId || "")
  const [colors, setColors] = useState<ColorType[] | null>(null)
  const [selectedColorId, setSelectedColorId] = useState<number | "">(initialValues?.colorId || "")
  const [features, setFeatures] = useState<FeatureType[] | null>(null)
  const [cities, setCities] = useState<CityType[] | null>(null)
  const [parkingZones, setParkingZones] = useState<ParkingZoneType[] | null>(null)
  const [gasStations, setGasStations] = useState<GasStationType[] | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | "">(
    initialValues?.location?.city ?? ""
  );

  const manufactureYearRef = useRef<HTMLInputElement | null>(null);
  const engineCapacityRef = useRef<HTMLInputElement | null>(null);
  const engineUnitRef = useRef<HTMLInputElement | null>(null);
  const maxSpeedRef = useRef<HTMLInputElement | null>(null);
  const transmissionRef = useRef<HTMLInputElement | null>(null);
  const fuelTypeRef = useRef<HTMLSelectElement | null>(null);
  const fuelPercentageRef = useRef<HTMLInputElement | null>(null);
  const fuelTankCapacityRef = useRef<HTMLInputElement | null>(null);
  const distanceRef = useRef<HTMLInputElement | null>(null);
  const plateNumberRef = useRef<HTMLInputElement | null>(null);
  const chassisNumberRef = useRef<HTMLInputElement | null>(null);
  const tarsVehicleIdentifierRef = useRef<HTMLInputElement | null>(null);
  const imeiRef = useRef<HTMLInputElement | null>(null);
  const latitudeRef = useRef<HTMLInputElement | null>(null);
  const longitudeRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLSelectElement | null>(null);
  const featureRefs = useRef<(HTMLInputElement | null)[]>([]);
  const endTripCityRefs = useRef<(HTMLInputElement | null)[]>([]);
  const includedParkingZoneRefs = useRef<(HTMLInputElement | null)[]>([]);
  const includedGasStationRefs = useRef<(HTMLInputElement | null)[]>([]);

  const setBrandBasedOnId = (selectedBrandId: number) => {
    if (brands) {
      const selectedBrand = brands.filter((brand) => {
        return brand.id === selectedBrandId
      })[0]

      console.log(selectedBrand);

      setSelectedBrand(selectedBrand)
    }
  }

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
    if (isEditForm && initialValues) {
      console.log('yes:', initialValues);
      setBrandBasedOnId(initialValues.brandId);
      setSelectedCity(initialValues?.location?.city ?? "");
    }
  }, [initialValues, brands]);

  useEffect(() => {

    const fetchModels = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/brands/${selectedBrand?.id}/models`, { credentials: "include" });
        const data = await response.json();
        console.log('Model data:', data);

        setModels(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const fetchColors = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/brands/${selectedBrand?.id}/colors`, { credentials: "include" });
        const data = await response.json();
        console.log('Color data:', data);

        setColors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (selectedBrand) {
      fetchModels();
      fetchColors();
    }
  }, [selectedBrand]);


  const getInputFields = () => {
    const manufactureYear = manufactureYearRef.current?.value;
    const engineCapacity = engineCapacityRef.current?.value;
    const engineUnit = engineUnitRef.current?.value;
    const maxSpeed = maxSpeedRef.current?.value;
    const transmission = transmissionRef.current?.value;
    const fuelType = fuelTypeRef.current?.value;
    const fuelPercentage = fuelPercentageRef.current?.value;
    const fuelTankCapacity = fuelTankCapacityRef.current?.value;
    const distance = distanceRef.current?.value;
    const plateNumber = plateNumberRef.current?.value;
    const chassisNumber = chassisNumberRef.current?.value;
    const tarsVehicleIdentifier = tarsVehicleIdentifierRef.current?.value;
    const imei = imeiRef.current?.value;
    const latitude = latitudeRef.current?.value;
    const longitude = longitudeRef.current?.value;
    const address = addressRef.current?.value;
    const city = cityRef.current?.value;
    const selectedFeatures = featureRefs.current
      .filter((ref) => ref?.checked)
      .map((ref) => Number(ref!.value));
    const selectedEndTripCities = endTripCityRefs.current
      .filter((ref) => ref?.checked)
      .map((ref) => Number(ref!.value));
    const selectedIncludedParkingZones = includedParkingZoneRefs.current
      .filter((ref) => ref?.checked)
      .map((ref) => Number(ref!.value));
    const selectedIncludedGasStations = includedGasStationRefs.current
      .filter((ref) => ref?.checked)
      .map((ref) => Number(ref!.value));

    const carData = {
      brandId: selectedBrand?.id,
      modelId: selectedModelId,
      colorId: selectedColorId,
      manufactureYear: manufactureYear,
      engineCapacity: engineCapacity,
      engineUnit: engineUnit,
      maxSpeed: maxSpeed,
      transmission: transmission,
      fuelTypeId: fuelType,
      fuelPercentage: fuelPercentage,
      fuelTankCapacity: fuelTankCapacity,
      distance: Number(distance),
      plateNumber: plateNumber,
      chassisNumber: chassisNumber,
      tarsVehicleDid: tarsVehicleIdentifier,
      imei: imei,
      latitude: latitude,
      longitude: longitude,
      address: address,
      city: city,
      carFeatureIds: selectedFeatures,
      endTripAvailableCityIds: selectedEndTripCities,
      includedParkingZoneIds: selectedIncludedParkingZones,
      includedGasStationIds: selectedIncludedGasStations
    };

    console.log('Car Data:', carData);

    return carData;
  }

  const handleAddCar = async () => {
    const carData = getInputFields();
    try {
      const response = await fetch("http://localhost:4000/api/admin/cars", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      const data = await response.json();
      console.log('Model data:', data);

      if (data.status === 401) {
        router.push('/login');
      }

      if (response.status === 201) {
        router.push(`/cars/${data.id}`);
        showToast('Car added successfully', 'success');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleEditCar = async () => {
    const carData = getInputFields();
    console.log('Inside edit car:', carData);
    try {
      const response = await fetch(`http://localhost:4000/api/admin/cars/${carId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandId: carData.brandId,
          modelId: carData.modelId,
          colorId: carData.colorId,
          fuelTypeId: carData.fuelTypeId,
          manufactureYear: carData.manufactureYear,
          engineCapacity: carData.engineCapacity,
          engineUnit: carData.engineUnit,
          distance: carData.distance,
          maxSpeed: carData.maxSpeed,
          transmission: carData.transmission,
          plateNumber: carData.plateNumber,
          chassisNumber: carData.chassisNumber,
          fuelTankCapacity: carData.fuelTankCapacity,
        }),
      });

      const locationResponse = await fetch(`http://localhost:4000/api/admin/cars/${carId}/location`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: carData.latitude,
          longitude: carData.longitude,
          address: carData.address,
        }),
      });

      const imeiResponse = await fetch(`http://localhost:4000/api/admin/cars/${carId}/imei`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imei: carData.imei
        }),
      });

      const data = await response.json();
      const locationData = await locationResponse.json();
      const imeiData = await imeiResponse.json();

      console.log('Updated car data:', data);
      console.log('Updated location data:', locationData);
      console.log('Updated IMEI data:', imeiData);

      if (response.status === 200 && locationResponse.status === 200 && imeiResponse.status === 200) {
        router.push(`/cars/${carId}`);
        showToast('Car updated successfully', 'success');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getInitialFeatureIds = () => {
    if (initialValues && initialValues.carFeatures) {
      return initialValues.carFeatures.map((feature) => feature.id);
    }
    return [];
  };

  const getInitialEndTripCityIds = () => {
    if (initialValues && initialValues.endTripAvailableCities) {
      return initialValues.endTripAvailableCities.map((city) => city.id);
    }
    return [];
  };

  const getInitialParkingZoneIds = () => {
    if (initialValues && initialValues.includedParkingZones) {
      return initialValues.includedParkingZones.map((zone) => zone.id);
    }
    return [];
  };

  const getInitialGasStationIds = () => {
    if (initialValues && initialValues.includedGasStations) {
      return initialValues.includedGasStations.map((station) => station.id);
    }
    return [];
  };

  return (
    <div className='mx-20 mt-10 mb-20 flex flex-col gap-3'>
      <h1 className='font-semibold text-3xl'>{isEditForm ? 'Edit Car' : 'Add Car'}</h1>
      <div className='w-full flex gap-36'>
        <div className='w-1/2 flex flex-col gap-3'>
          <div className='flex gap-5 w-full'>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="">Brand:</label>
              <select value={Number(selectedBrand?.id) || ""} className='px-2 py-1 border-2 border-gray-300 rounded-md' name="" id="" onChange={(e) => setBrandBasedOnId(Number(e.target.value))}>
                <option value="">Select Brand</option>
                {brands && brands.map((brand, index) => {
                  return <option value={brand.id} key={index}>{brand.name}</option>
                })}
              </select>
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="">Model:</label>
              <select className='px-2 py-1 border-2 border-gray-300 rounded-md' name="" id="" value={Number(selectedModelId)} onChange={(e) => setSelectedModelId(Number(e.target.value))}>
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
              <select className='px-2 py-1 border-2 border-gray-300 rounded-md' name="" id="" value={Number(selectedColorId)} onChange={(e) => setSelectedColorId(Number(e.target.value))}>
                <option value="">Select Color</option>
                {colors && colors.map((color, index) => {
                  return <option value={color.id} key={index}>{color.name}</option>
                })}
              </select>
            </div>
            <div className='flex flex-col w-1/2'>
              <label htmlFor="">Manufacture Year:</label>
              <input
                ref={manufactureYearRef}
                type="number"
                name="year"
                defaultValue={initialValues?.manufactureYear || ""}
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
                  ref={engineCapacityRef}
                  type="number"
                  defaultValue={initialValues?.engineCapacity || ""}
                  name="capacity"
                  placeholder="Ex: 2.0"
                  min={0}
                  className="px-2 py-1 border-2 border-gray-300 rounded-md"
                />
              </div>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Engine Unit:</label>
                <input
                  ref={engineUnitRef}
                  type="text"
                  defaultValue={initialValues?.engineUnit || ""}
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
                  ref={maxSpeedRef}
                  type="number"
                  defaultValue={initialValues?.maxSpeed || ""}
                  name="maxSpeed"
                  placeholder="Ex: 100"
                  min={0}
                  className="px-2 py-1 border-2 border-gray-300 rounded-md"
                />
              </div>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Transmission:</label>
                <input
                  ref={transmissionRef}
                  type="number"
                  defaultValue={String(initialValues?.transmission) || ""}
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
              {/* here */}
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Fuel Type:</label>
                <select ref={fuelTypeRef} className='px-2 py-1 border-2 border-gray-300 rounded-md' name="fuelType" defaultValue={initialValues?.fuelTypeId || ""}
                >
                  <option value="">Select Fuel Type</option>
                  {fuelTypes && fuelTypes.map((fuelType, index) => {
                    return <option value={fuelType.id} key={index}>{fuelType.name}</option>
                  })}
                </select>
              </div>
              <div className='flex flex-col w-1/2'>
                <label htmlFor="">Fuel Percentage:</label>
                <input
                  ref={fuelPercentageRef}
                  type="number"
                  defaultValue={initialValues?.fuelPercentage || ""}
                  name="fuelPercentage"
                  placeholder="Ex: 80"
                  min={0}
                  max={100}
                  className="px-2 py-1 border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className='w-full flex flex-col mt-3'>
              <div className='w-full flex gap-5'>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Fuel Tank Capacity:</label>
                  <input
                    ref={fuelTankCapacityRef}
                    defaultValue={initialValues?.fuelTankCapacity || ""}
                    type="text"
                    name="fuelTankCapacity"
                    placeholder="Ex: 50"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Distance in km:</label>
                  <input
                    ref={distanceRef}
                    defaultValue={initialValues?.distance || ""}
                    type="number"
                    name="distance"
                    placeholder="Ex: 100"
                    min={0}
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
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
                    ref={plateNumberRef}
                    defaultValue={initialValues?.plateNumber || ""}
                    type="text"
                    name="plateNumber"
                    placeholder="Ex: E4350873"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Chassis Number:</label>
                  <input
                    ref={chassisNumberRef}
                    defaultValue={initialValues?.chassisNumber || ""}
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
                    ref={tarsVehicleIdentifierRef}
                    defaultValue={initialValues?.tarsVehicleDid || ""}
                    type="text"
                    name="tarsVehicleIdentifier"
                    placeholder="Ex: did:tars:otZ8Kko27zNW"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">Imei:</label>
                  <input
                    ref={imeiRef}
                    defaultValue={initialValues?.imei || ""}
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
                      ref={latitudeRef}
                      defaultValue={initialValues?.location.latitude || ""}
                      type="number"
                      name="latitude"
                      placeholder="Ex: 25.065963"
                      className="px-2 py-1 border-2 border-gray-300 rounded-md"
                    />
                  </div>
                  <div className='flex flex-col w-1/2'>
                    <label htmlFor="">Longitude:</label>
                    <input
                      ref={longitudeRef}
                      defaultValue={initialValues?.location.longitude || ""}
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
                    ref={addressRef}
                    defaultValue={initialValues?.location.address || ""}
                    type="text"
                    name="address"
                    placeholder="Ex: 123 Main St"
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div className='flex flex-col w-1/2'>
                  <label htmlFor="">City:</label>
                  <select
                    ref={cityRef}
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="px-2 py-1 border-2 border-gray-300 rounded-md"
                    name="city"
                  >
                    <option value="">Select City</option>

                    {cities?.map((city) => (
                      <option value={city.name} key={city.name}>
                        {city.name}
                      </option>
                    ))}
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
                        value={feature.id}
                        defaultChecked={getInitialFeatureIds().includes(feature.id)}

                        ref={(el) => {
                          featureRefs.current[index] = el;
                        }}
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
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={city.id}
                        defaultChecked={getInitialEndTripCityIds().includes(city.id)}
                        ref={(el) => {
                          endTripCityRefs.current[index] = el;
                        }}
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
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={zone.id}
                        defaultChecked={getInitialParkingZoneIds().includes(zone.id)}
                        ref={(el) => {
                          includedParkingZoneRefs.current[index] = el;
                        }}
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
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={station.id}
                        defaultChecked={getInitialGasStationIds().includes(station.id)}
                        ref={(el) => {
                          includedGasStationRefs.current[index] = el;
                        }}
                      />
                      {station.name}
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
          <div className='mt-5 mr-20 flex justify-end'>
            <button className='bg-black text-white px-3 py-1 rounded-md' onClick={isEditForm ? handleEditCar : handleAddCar}>
              {isEditForm ? 'Update Car' : 'Add Car'}
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default CarForm
