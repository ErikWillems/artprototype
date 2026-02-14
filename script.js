(function () {
  let gameAction = "hands";
  let gameHands = 0;
  let gameFingers = 0;

  d3.selectAll("div[data-action] h1, div[data-action] p").each(function () {
    const elem = d3.select(this);
    const text = elem.text();
    elem.text("");
    elem.append("span").text(text);
    elem.append("span").text("");
  });

  setInterval(function () {
    let hasJob = false;
    d3.selectAll("div[data-action].active h1, div[data-action].active p").each(
      function () {
        if (hasJob) {
          return;
        }
        const first = d3.select(this).select("span:first-child");
        const last = d3.select(this).select("span:last-child");
        const cursor = last.text().length;
        if (last.text().length < first.text().length) {
          hasJob = true;
          const newText = last.text() + first.text()[last.text().length];
          last.text(newText);
        }
      },
    );
    //
  }, 50);

  d3.selectAll("div[data-action] button").on("click", function () {
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
    d3.selectAll("div[data-action]").each(function () {
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
