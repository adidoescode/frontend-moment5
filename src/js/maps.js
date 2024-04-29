// Lägger till passiva listeners för att hindra default behaviour på scroll då det är en bugg med kartan

document.addEventListener('touchstart', function () { }, { passive: true });
document.addEventListener('touchmove', function () { }, { passive: true });

async function initAutocomplete() {
    // Skapar en ny map med vald latitud och longitud som laddas in när sidan startar
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 58.767755, lng: 12.213290 },
        zoom: 13,
        mapTypeId: "roadmap",
    });

    //Skapar även en marker för stället kartan laddas in på
    const initialMarker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        title: 'Startplats för kartan'
    });


    // Skapar ett sökfält som blir länkat till ett ul-element
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // När användaren börjar skriva ger scripten en antagelse för vilken plats hen vill söka på 
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // Hämtar icon, latitud och longitud för varje plats
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Error - Returnerad plats innehåller ingen geometri");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Skapar ny marker för varje plats som söks upp
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                }),
            );
            if (place.geometry.viewport) {
                // Bara geocodes har satt viewport
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

window.initAutocomplete = initAutocomplete;
