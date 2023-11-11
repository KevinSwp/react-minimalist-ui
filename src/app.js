import Modal from "./lib/components/modal/modal";
import Dropdown from "./lib/components/dropdown/dropdown";

export default  function App() {
  return (
    <div >
        <Modal>
            <p>test de modal</p>
        </Modal>

        <Dropdown>
            <p>test de dropdown</p>
        </Dropdown>
    </div>
  );
}
