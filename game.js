const {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    Mouse,
    MouseConstraint,
    Body,
    Events,
  } = Matter;
  
  const engine = Engine.create();
  const { world } = engine;
  engine.gravity.x = 0;
  engine.gravity.y = 0;

  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 600,
      height: 600,
      wireframes: false,
    },
  });
  
  Render.run(render);
  
  // Runnerの定義と実行
  const runner = Runner.create({
    delta: 60, // fpsに設定
  });
  Runner.run(runner, engine);
  
  const planetRadius = 50;
  const planet = Bodies.circle(300, 300, planetRadius, {
    render: {
      fillStyle: "dimgray",
      strokeStyle: "cyan",
      lineWidth: 2,
    },
    isStatic: true,
  });
  World.add(world, planet);
  
  // 惑星の質量を設定
  planet.mass = 1000;
  planet.inverseMass = 1 / planet.mass;

  const ball = createBall();
  World.add(world, ball);
  
  // 重力の定数
  const G = 0.0001;
  
  // 惑星の中心に向かって重力を適用
  Events.on(engine, "beforeUpdate", (event) => {
    const dx = planet.position.x - ball.position.x;
    const dy = planet.position.y - ball.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    const forceMagnitude = (G * planet.mass * ball.mass) / (distance * distance);
    const force = {
      x: (dx / distance) * forceMagnitude,
      y: (dy / distance) * forceMagnitude,
    };
  
    Body.applyForce(ball, ball.position, force);
  });
  
  Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      if (pairs[i].bodyA === planet || pairs[i].bodyB === planet) {
        alert("ゲームオーバー");
        location.reload();
      }
    }
  });