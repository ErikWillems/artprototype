(function () {
  let gameQuestion = 0;
  let gameHands = 0;
  let gameFingers = 0;

  d3.selectAll(".question button").on("click", function () {
    const button = d3.select(this);
    const action = button.attr("data-action");
    const hands = button.attr("data-hands");
    const fingers = button.attr("data-fingers");
    if (action === "next") {
      gameQuestion += 1;
    }
    if (typeof hands === "string") {
      gameHands = parseInt(hands, 10);
    }

    if (typeof fingers === "string") {
      gameFingers = parseInt(fingers, 10);
    }
    console.log(
      gameFingers,
      gameHands,
      gameFingers / gameHands ? gameHands : 1,
    );

    digest();
  });

  const digest = function () {
    d3.selectAll(".question").classed("d-none", function (d, i) {
      return i !== gameQuestion;
    });
    d3.select(".hand-left")
      .classed("invisible", function () {
        return gameHands < 1;
      })
      .attr(
        "src",
        "hand-left-" +
          Math.max(0, (gameFingers / gameHands).toString()) +
          ".png",
      );
    d3.select(".hand-right")
      .classed("invisible", function () {
        return gameHands < 2;
      })
      .attr(
        "src",
        "hand-right-" +
          Math.max(0, (gameFingers / gameHands).toString()) +
          ".png",
      );
  };
  digest();
})(window);
