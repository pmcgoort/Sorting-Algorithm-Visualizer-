import React, { Component } from 'react';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: [],
      hideCreate: false,
      hideSorts: true
    }
    this.createNums = this.createNums.bind(this)
    this.bubbleSort = this.bubbleSort.bind(this)
    this.selectionSort = this.selectionSort.bind(this)
    this.insertionSort = this.insertionSort.bind(this)
    this.quickSort = this.quickSort.bind(this)
    this.animate = this.animate.bind(this)
    this.stopSort = this.stopSort.bind(this)
  }

  /*creates the array of numbers that will be sorted*/
  createNums(){

    var nums = []
    for(let i = 0; i < 100; i++){
      nums.push(Math.floor(Math.random() * 100))
    }

    this.setState({
      nums: nums,
      hideSorts: false
    })
  }

  /*animates the sorting process*/
  animate(swaps){
    document.getElementById('createGraph').disabled = true

    const bars = document.getElementsByClassName('bar')
    var i = 0
    var animating = setInterval(animate, 4)

    function animate(){
      const bar1 = bars[swaps[i][0]].style
      const bar2 = bars[swaps[i][1]].style

      /*change color of the bars being swapped*/
      bar1.backgroundColor = 'blue'
      bar2.backgroundColor = 'blue'

      /*swap height of the two bars*/
      if(swaps[i][2]){
        let temp = bar1.height
        bar1.height = bar2.height
        bar2.height = temp
      }
      i++
      if(i === swaps.length){
        clearInterval(animating)
        document.getElementById('createGraph').disabled = false
      }

      setTimeout(function(){
        bar1.backgroundColor = 'gray'
        bar2.backgroundColor = 'gray'
      }, 20)
    }
  }


  bubbleSort(){

    var nums = [...this.state.nums]
    var j = nums.length - 1
    var swaps = []

    while(j > 0){
      for(let i = 0; i < j; i++){
        swaps.push([i, i + 1, false])
        if(nums[i] > nums[i + 1]){
          var temp = nums[i]
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

    var nums = [...this.state.nums]
    var swaps = []

    for(let i = 0; i < nums.length - 1; i++){
      var min = nums[i]
      var minIndex = i
      var prevMinIndex = swaps.length


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

      var temp = nums[i]
      nums[i] = nums[minIndex]
      nums[minIndex] = temp
    }

    this.setState({
      hideSorts: true
    })

    this.animate(swaps, nums)
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
        swaps.push([i, j, false])
        while(nums[i] < mid){
          i++
          swaps.push([i, j, false])
        }
        while(nums[j] > mid){
          j--
          swaps.push([i, j, false])
        }
        if(i <= j){
          swaps[swaps.length - 1][2] = true
          var temp = nums[i]
          nums[i] = nums[j]
          nums[j] = temp
          i++
          j--
        }
      }
      return i
    }

    this.setState({
      hideSorts: true
    })

    this.animate(swaps)
  }


  stopSort(){
    document.getElementById('createGraph').disabled = true
  }

  render(){
    var sortIds = 'sortButton'
    if(this.state.hideSorts){
      sortIds = 'sortButton hide'
    }

    var nums = this.state.nums
    return(
      <div id='main'>
        <button id='createGraph' onClick={this.createNums}>Create graph</button>
        <button id='bubbleSort' className={sortIds} onClick={this.bubbleSort}>Bubble Sort</button>
        <button id='selectionSort' className={sortIds} onClick={this.selectionSort}>Selection Sort</button>
        <button id='insertionSort' className={sortIds} onClick={this.insertionSort}>Insertion Sort</button>
        <button id='quickSort' className={sortIds} onClick={this.quickSort}>Quick Sort</button>
        <div id='bars'>
          {
            nums.map((i,idx) => {
              return(
                <div
                  className="bar"
                  style={{
                      backgroundColor: 'gray',
                      height: `${2*i/3}vh`,
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
