function createBall() {
    const x = 100;
    const y =  100;
    const angle = Math.PI / 4 - 0.3;
    // const angle = (Math.random() * 0.25 + 0.25) * Math.PI / 4;
    const minSpeed = 2; // 速度の下限を設定
    const speedRange = 5; // 最大速度と最小速度の差
    const speed = Math.random() * speedRange + minSpeed; // 惑星を2回以上周回する速度
  
    const ball = Bodies.circle(x, y, 5, {
      render: {
        fillStyle: 'white',
      },
    });
  
    // ボールに軌道を設定
    Matter.Body.setVelocity(ball, {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    });
  
    return ball;
  }