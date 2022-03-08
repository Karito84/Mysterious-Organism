// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }

  //create a factory function to be able to create multiple objects 

const pAequorFactory = (specimenNum, dna) => {
    
    return {
    specimenNum,
    dna,
    mutate() {/*it is responsible for randomly selecting a base in the object's dna property and 
    changing the current base to a different base.*/
        const randomIndex = Math.floor(Math.random() * 15); // it'll randomly pick a base at that index 
        const newBase = returnRandBase() ;
        if(newBase !== this.dna[randomIndex]) { 
     
            this.dna[randomIndex] = newBase;// sets a new base for the chosen index
  
        } else if(newBase === this.dna[randomIndex]) {//new base has to be different from the current one
       
            const dnaBases = ['A', 'T', 'C', 'G'];
            dnaBases.splice(dnaBases.indexOf(newBase),1);//removes current base from the bases we will choose from
 
            this.dna[randomIndex] = dnaBases[Math.floor(Math.random()* 3)];
   
        }
        return this.dna;
    }, 
    compareDNA(object2, showResult =true) {//added showResult to theoriginal method, as I had to use different return for the challenge question
        console.log(this.dna);
        console.log(object2.dna);
        
        let count = 0;
        for( let i = 0; i < this.dna.length; i++) {
      
            if(this.dna[i] === object2.dna[i]){
            count ++;
    
            }
      
        }
        let commonDna = ((count/15) * 100).toFixed(2);
          if(showResult) {
            return `Specimen ${this.specimenNum} and specimen ${object2.specimenNum} have ${commonDna}% DNA in common.`;
          } else {
            return commonDna;
          }
        },
    willLikelySurvive() {
        let countCandGBases = 0;
        for (let i = 0; i< this.dna.length; i++) {
          if(this.dna[i] === 'C' || this.dna[i] === 'G') {
            countCandGBases ++;
          }
        }if ((countCandGBases/15) >= 0.6 ){
            return true;
        } else {
            return false;
        }
        
    },
    complementStrand() {//this is additional challenge method
        
        const complementaryDNAStrand = [];
        for(let i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === 'A') {
            complementaryDNAStrand.push('T');
          } else if(this.dna[i] === 'T'){
            complementaryDNAStrand.push('A');
          } else if(this.dna[i] === 'C'){
            complementaryDNAStrand.push('G');
          } else {
            complementaryDNAStrand.push('C');
          }
        } return complementaryDNAStrand;
    }

}}


    /* create 30 instances to research, that can survive in their natural environment, and store them
    in an aray */

    const instancesArray = [];
    
        let number = 1;

        while( instancesArray.length < 30) {
            const obj = pAequorFactory(number, mockUpStrand()); 
                
            if(obj.willLikelySurvive() && !instancesArray.includes(obj.dna)){
                instancesArray.push(obj);
                number ++;
            }
        } 

// second challenge- Use the .compareDNA() to find the two most related instances of pAequor

    const mostRelatedInstances = array => {
      
      let currentHighest = 0;
      let allTimeHighest = 0;
      
      let mostRelated = [];
        
        for(let i = 0; i < instancesArray.length; i++){
          for(let j = i + 1; j < instancesArray.length; j++ ){
          
            currentHighest = instancesArray[i].compareDNA(instancesArray[j], false);
 
            if(currentHighest > allTimeHighest){
              
              allTimeHighest = currentHighest;
              mostRelated.pop();
              mostRelated.pop();
              mostRelated.push(instancesArray[i],instancesArray[j]);
            }
          }
        } console.log(`specimen #${mostRelated[0].specimenNum} and #${mostRelated[1].specimenNum} have ${allTimeHighest}% DNA in common.`);
          return mostRelated;

    }


console.log(instancesArray)
console.log(instancesArray[1])
console.log(instancesArray[0].compareDNA(instancesArray[29]))
console.log(instancesArray[0].willLikelySurvive());
const object1 = pAequorFactory(1, [ 'A', 'C', 'T', 'C', 'A', 'A', 'C', 'A', 'T', 'G', 'C', 'G', 'C', 'A', 'T' ])
console.log(object1.dna);
console.log(object1.complementStrand());//checking if the method works
