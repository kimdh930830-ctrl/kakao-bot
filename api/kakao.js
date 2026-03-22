let total = 0;

export default function handler(req, res) {
  try {
    const body = req.body;

    if (!body || !body.userRequest) {
      return res.status(200).json({ message: "OK" });
    }

    const message = body.userRequest.utterance;

    // 숫자 찾기
    const match = message.match(/[+-]?\d+/);

    if (match) {
      const amount = parseInt(match[0], 10);
      total += amount;

      return res.status(200).json({
        version: "2.0",
        template: {
          outputs: [{
            simpleText: {
              text: `💰 ${amount}원 반영\n현재 합계: ${total}원`
            }
          }]
        }
      });
    }

    if (message === "총액") {
      return res.status(200).json({
        version: "2.0",
        template: {
          outputs: [{
            simpleText: {
              text: `📊 현재 총액: ${total}원`
            }
          }]
        }
      });
    }

    return res.status(200).json({
      version: "2.0",
      template: {
        outputs: [{
          simpleText: {
            text: "금액 또는 '총액' 입력"
          }
        }]
      }
    });

  } catch (error) {
    return res.status(200).json({
      version: "2.0",
      template: {
        outputs: [{
          simpleText: {
            text: "오류 발생"
          }
        }]
      }
    });
  }
}