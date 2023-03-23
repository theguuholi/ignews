import { useEffect, useState } from "react";

export function Async() {
    const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {}, 1000);
  }, []);

  return (
    <div>
        <h1>Hello!</h1>
        {isButtonVisible && <button>Visible</button> }
    </div>
  )
}
