const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
const { world } = engine;
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
Runner.run(Runner.create(), engine);

const planet = Bodies.circle(300, 300, 50, {
  render: {
    fillStyle: 'dimgray',
    strokeStyle: 'cyan',
    lineWidth: 2,
  },
  isStatic: true,
});
World.add(world, planet);

const ball = createBall();
World.add(world, ball);

Matter.Events.on(engine, 'collisionStart', (event) => {
  const pairs = event.pairs;
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].bodyA === planet || pairs[i].bodyB === planet) {
      alert('ゲームオーバー');
      location.reload();
    }
  }
});
