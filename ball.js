function createBall() {
    const x = Math.random() * 500 + 50;
    const y = Math.random() * 500 + 50;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1; // 惑星を1 - 5回周回する速度
  
    const ball = Bodies.circle(x, y, 2, {
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