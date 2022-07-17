class LoadingBar{
  static count = 0;
  constructor(duration){
    LoadingBar.count++;
    this.duration = duration;
    this.outerBar = document.createElement('div');
    this.outerBar.setAttribute('class', 'outerBar');
    this.outerBar.setAttribute('id', LoadingBar.count);

    this.innerBar = document.createElement('div');
    this.innerBar.setAttribute('class', 'innerBar');

    this.outerBar.appendChild(this.innerBar);
    document.body.appendChild(this.outerBar);

  }
  load(){
    const widthOfOuterBar = parseInt(getComputedStyle(this.outerBar).width);

    const widthToUpdate = 0.01 * (widthOfOuterBar/this.duration);
    this.timer = setInterval(() => {
      const currentInnerBarWidth = parseFloat(getComputedStyle(this.innerBar).width);
      const currentOuterBarWidth = parseFloat(getComputedStyle(this.outerBar).width);

      // Check if theres still to load
      if(currentInnerBarWidth < currentOuterBarWidth)
      {
          // Check for overflow. Not needed if parseFlowt is being used above
          if(currentInnerBarWidth + widthToUpdate <= currentOuterBarWidth){
              this.innerBar.style.width = currentInnerBarWidth + widthToUpdate + "px";
          }
          // overflown
          else{
            this.innerBar.style.width = currentOuterBarWidth + "px";
          }
      }
      else
        clearInterval(this.timer);

    }, 10);
  }
}


document.querySelector('#loadButton').addEventListener('click', (event) => {
    event.preventDefault();
    const selectDuration = document.querySelector('#selectDuration');
    const N = selectDuration.options[selectDuration.selectedIndex].value;
    new LoadingBar(N).load()
})
