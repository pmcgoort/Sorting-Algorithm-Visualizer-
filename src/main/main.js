import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: [],
      hideCreate: false,
      hideSorts: true,
      initial: true
    }
    this.createNums = this.createNums.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.selectionSort = this.selectionSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.animate = this.animate.bind(this);
  }

  /*creates the array of numbers that will be sorted*/
  createNums(){
    let numBars;
    if(this.state.initial){
      numBars = 50;
    } else {
      numBars = document.getElementById('numBarsSlider').value;
    }
    let nums = [];
    for(let i = 0; i < numBars; i++){
      nums.push(Math.floor(Math.random() * 50))
    }

    this.setState({
      nums: nums,
      hideSorts: false,
      initial: false
    })
  }

  /*animates the sorting process*/
  animate(swaps){
    document.getElementById('numBarsSlider').disabled = true;
    document.getElementById('speedSlider').disabled = true;
    document.getElementById('createGraph').disabled = true;

    const bars = document.getElementsByClassName('bar')
    for(let i = 0; i < bars.length; i++){
        const bar = bars[i].style;
        bar.height = this.state.nums[i].toString() + 'vh';
    }


    let i = 0;
    let speed = parseInt(document.getElementById('speedSlider').value);
    let animating = setInterval(animate, (11 - speed / 10) * 4);

    function animate(){
      const bar1 = bars[swaps[i][0]].style;
      const bar2 = bars[swaps[i][1]].style;

      /*change color of the bars being swapped*/
      bar1.backgroundColor = 'blue';
      bar2.backgroundColor = 'blue';

      /*swap height of the two bars*/
      if(swaps[i][2]){
        let temp = bar1.height;
        bar1.height = bar2.height;
        bar2.height = temp;
      }
      i++
      if(i === swaps.length){
        clearInterval(animating);
        document.getElementById('numBarsSlider').disabled = false;
        document.getElementById('speedSlider').disabled = false;
        document.getElementById('createGraph').disabled = false;
      }

      setTimeout(function(){
        bar1.backgroundColor = 'gray';
        bar2.backgroundColor = 'gray';
      }, 20)
    }

  }


  bubbleSort(){

    let nums = [...this.state.nums]
    let j = nums.length - 1
    let swaps = []

    while(j > 0){
      for(let i = 0; i < j; i++){
        swaps.push([i, i + 1, false])
        if(nums[i] > nums[i + 1]){
          let temp = nums[i]
          nums[i] = nums[i + 1]
          nums[i + 1] = temp
          swaps[swaps.length - 1][2] = true
        }
      }
      j--
    }

    this.setState({
      hideSorts: true
    })

    this.animate(swaps)
  }


  selectionSort(){

    let nums = [...this.state.nums]
    let swaps = []

    for(let i = 0; i < nums.length - 1; i++){
      let min = nums[i]
      let minIndex = i
      let prevMinIndex = swaps.length


      for(let j = i + 1; j < nums.length; j++){
        swaps.push([i, j, false])
        if(nums[j] < min){
          swaps[prevMinIndex][2] = false
          prevMinIndex = swaps.length - 1
          swaps[prevMinIndex][2] = true
          min = nums[j]
          minIndex = j
        }
      }

      let temp = nums[i]
      nums[i] = nums[minIndex]
      nums[minIndex] = temp
    }

    this.setState({
      hideSorts: true
    })

    this.animate(swaps)
  }

  insertionSort(){

    var nums = [...this.state.nums]
    var swaps = []

    for(let i = 1; i < nums.length; i++){
      var j = i
      var k = i - 1

      while(j !== 0 && nums[j] < nums[k]){
        swaps.push([k, j, true])
        var temp = nums[k]
        nums[k] = nums[j]
        nums[j] = temp
        j--
        k--
      }
    }

    this.setState({
      hideSorts: true
    })

    this.animate(swaps)
  }


  quickSort(){

    var nums = [...this.state.nums]
    var swaps = []
    sort(nums, 0, nums.length - 1)

    function sort(nums, i, j){
      var index
      if(nums.length > 1){
        index = partition(nums, i, j)
        if(i < index - 1){
          sort(nums, i, index - 1)
        }
        if(j >= index){
          sort(nums, index, j)
        }
      }
    }

    function partition(nums, i, j) {
      var mid = nums[Math.floor((i + j) / 2)]

      while(i <= j){
        swaps.push([i, j, false]);
        while(nums[i] < mid){
          i++;
          swaps.push([i, j, false]);
        }
        while(nums[j] > mid){
          j--;
          swaps.push([i, j, false]);
        }
        if(i <= j){
          swaps[swaps.length - 1][2] = true;
          var temp = nums[i];
          nums[i] = nums[j];
          nums[j] = temp;
          i++;
          j--;
        }
      }
      return i
    }

    this.setState({
      hideSorts: true
    })

    this.animate(swaps);
  }



  render(){
    let numberOfBars = 0;
    if(this.state.initial){
      this.createNums();
    } else {
      numberOfBars = document.getElementById('numBarsSlider').value;
    }


    let buttons = 'buttons';
    if(this.state.hideSorts){
      buttons = 'buttons hide';
    }
    let nums = this.state.nums;
    return(
      <div id='main'>
        <div>
          <input onChange={this.createNums} type="range" id="numBarsSlider" min="2" max="100"/>
          <label for="numBars">Number of Bars: {numberOfBars}</label>
        </div>
        <div>
          <input type="range" id="speedSlider" min="1" max="100"/>
          <label for="numBars">Sorting Speed</label>
        </div>
        <button id='createGraph' className='buttons' onClick={this.createNums}>New Bars</button>
        <button id='bubbleSort' className={buttons} onClick={this.bubbleSort}>Bubble Sort</button>
        <button id='selectionSort' className={buttons} onClick={this.selectionSort}>Selection Sort</button>
        <button id='insertionSort' className={buttons} onClick={this.insertionSort}>Insertion Sort</button>
        <button id='quickSort' className={buttons} onClick={this.quickSort}>Quick Sort</button>
        <div id='bars'>
          {
            nums.map((i,idx) => {
              return(
                <div
                  className='bar'
                  key={idx}
                  style={{
                      backgroundColor: 'gray',
                      height: `${i}vh`,
                      width: `${100 / this.state.nums.length / 2}vw`,
                      margin: `${100 / this.state.nums.length / 4}vw`
                    }}>
                </div>
            )
            })
          }
        </div>
      </div>
    )
  }
}

export default Main;
