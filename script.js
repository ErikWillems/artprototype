(function () {
  let gameAction = "hands";
  let gameHands = 0;
  let gameFingers = 0;

  d3.selectAll(".container[data-action] button").on("click", function () {
    const button = d3.select(this);
    const action = button.attr("data-action");
    const hands = button.attr("data-hands");
    const fingers = button.attr("data-fingers");
    if (typeof action === "string") {
      gameAction = action;
    }
    if (typeof hands === "string") {
      gameHands = parseInt(hands, 10);
    }

    if (typeof fingers === "string") {
      gameFingers = parseInt(fingers, 10);
    }

    digest();
  });

  const digest = function () {
    d3.selectAll(".container[data-action]").each(function () {
      if (d3.select(this).attr("data-action") === gameAction) {
        d3.select(this).classed("active", true);
      } else {
        if (d3.select(this).classed("active")) {
          d3.select(this).classed("active", false);
          d3.select(this).classed("done", true);
        }
      }
    });

    digestHands();
  };

  const digestHands = function () {
    const handLeft = d3.select(".hand-left");
    const handRight = d3.select(".hand-right");
    if (gameHands === 0) {
      handLeft.attr("src", "hand-none.png");
      handRight.attr("src", "hand-none.png");
    } else if (gameHands === 1) {
      handLeft.attr("src", "hand-" + gameFingers + ".png");
      handRight.attr("src", "hand-none.png");
    } else {
      handLeft.attr("src", "hand-" + gameFingers * 0.5 + ".png");
      handRight.attr("src", "hand-" + gameFingers * 0.5 + ".png");
    }
  };
  digest();
})(window);
