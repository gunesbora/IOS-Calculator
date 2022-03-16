const primaryDisplay = document.querySelector('.primary-display');
const secondaryDisplay = document.querySelector('.secondary-display');
const buttons = document.querySelector('.buttons-container');



class Calculator{
    constructor(primaryDisplay,secondaryDisplay){
        this.primaryDisplay = primaryDisplay;
        this.secondaryDisplay = secondaryDisplay;
        
        this.clear();
    }
    
    clear(){
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = '';
        
    }
   
    
    appendNumberandDecimal(numberAndDecimal){
       if(numberAndDecimal === '.' && this.currentOperand.includes('.')) return;
       if(numberAndDecimal === '0' && this.currentOperand === '0') return;
       if(numberAndDecimal == '0' && this.currentOperand === '0' || this.currentOperand === 0) this.currentOperand = numberAndDecimal;
       if(numberAndDecimal === '.' && this.currentOperand !== '0' && this.currentOperand !=='0.'&& primaryDisplay.textContent === '0') {
           numberAndDecimal = '0.';
           
        
       }
       if(numberAndDecimal !== '0' && this.currentOperand === '0' && numberAndDecimal !=='.'){
           this.currentOperand = numberAndDecimal;
           return;
       }
       
       if (this.equalOrPercentBtnPressed) {
           console.log("1")
           equalOrPercentBtnPressed = false; //* clear for next usage
           this.currentOperand = num;
           return;
      }

       
       
       
     
       
       this.currentOperand += numberAndDecimal;
       
       
    }
    updateDisplay(){
        
        
        primaryDisplay.textContent = this.currentOperand;
        primaryDisplay.textContent = primaryDisplay.textContent.slice(0,7);
        if(this.operation != null){
            if(this.previousOperand[this.previousOperand.length-1] ==='.'){
                this.previousOperand = this.previousOperand.slice(0,-1);
            }
           
            secondaryDisplay.textContent = `${this.previousOperand} ${this.operation}`;
            console.log(secondaryDisplay.textContent);
        }
        else{
            secondaryDisplay.textContent = ''; 
        }
        console.log(primaryDisplay.textContent)
        

    }
    optForOperation(opt){
        if(this.currentOperand === '') return;
        if(this.previousOperand) {
            compute ();}
        this.operation = opt;
        this.previousOperand = this.currentOperand;
        this.currentOperand = " ";
    }

    compute(){
        let computation = 0;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        console.log(current)
        console.log(prev)
        
        switch(this.operation){
            case '+':
              computation = prev + current;
              break;
            case '-':
                computation = prev - current ;
                break;
            case '÷':
                computation = prev / current;
                break;
            case 'x':
                
                computation = prev * current;
                
                
                break;
            default:
                return;    
        }
        
        this.currentOperand = computation;
        
        this.operation = '';
        this.previousOperand = '';
    }
    pmProcessor(){
        if(!this.currentOperand || this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand * -1 ;
    }
    percent(){
        if(!this.currentOperand) return;
        this.currentOperand = this.currentOperand / 100 ;
    }


}

const calculator = new Calculator(primaryDisplay,secondaryDisplay);
buttons.addEventListener('click',(e)=>{
    if(e.target.classList.contains('number')){
        calculator.appendNumberandDecimal(e.target.innerText);
        calculator.updateDisplay();
    }
    if(e.target.classList.contains('decimal')){
        calculator.appendNumberandDecimal(e.target.innerText)
        calculator.updateDisplay();
    }
    if(e.target.classList.contains('ac')){
        calculator.clear();
        calculator.updateDisplay();
    }
    if(e.target.classList.contains('operator')){
        calculator.optForOperation(e.target.textContent);
        
        calculator.updateDisplay();
    }
    if(e.target.classList.contains('equal')){
        // calculator.appendNumberandDecimal();
        
        calculator.compute();
        calculator.updateDisplay();
        
        
    }
    if(e.target.classList.contains('pm')){
        
        calculator.pmProcessor();

        calculator.updateDisplay();
        
    }
    if(e.target.classList.contains('percent')){
        calculator.percent();
        calculator.updateDisplay();
        
    }
})

