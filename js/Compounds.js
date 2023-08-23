AFRAME.registerComponent("atoms", {
  
  init: async function (){
    var compounds = await this.getCompound();


    var barcodes = Object.keys(compounds);

    barcodes.map(barcode => {
        var element = compounds[barcode];

        this.createAtom(element);
    })
  },
  
  getCompound: function(){
    return fetch("js/compoundList.json")
    .then(res => res.json())
    .then(data => data)
  },

  getElementColor: function(){
    return fetch("js/elementColors.json")
    .then(res => res.json())
    .then(data => data)
  },

  createAtom: async function (element){
    var elementName = element.element_name;
    var barcodeValue = element.barcode_value;
    var numOfElectrons = element.number_of_electron;
    var colors = await this.getElementColor();
    
    var scene = document.querySelector("a-scene")
    var marker = document.createElement("a-marker")
    marker.setAttribute("id",`marker-${barcodeValue}` )
    marker.setAttribute("type", "barcode")
    marker.setAttribute("element_name", elementName)
    marker.setAttribute("value", barcodeValue)

    scene.appendChild(marker);

    var atom = document.createElement("a-entity");
    atom.setAttribute("id", `${elementName}-${barcodeValue}`);
    marker.appendChild(atom);

    var card = document.createElement("a-entity");
    card.setAttribute("id", `card-${elementName}`);
    card.setAttribute("geometry", {
        primitive: "plane",
        width: 1,
        height: 1
    });
    card.setAttribute("material", {
        src: `assets/atom_cards/card_${elementName}.png`
    });
    card.setAttribute("position", {x: 0, y:0, z:0});
    atom.appendChild(card);
  },
  
});
