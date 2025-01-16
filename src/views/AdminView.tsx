import useFetchProducts from "../hooks/useFetchProducts";
import InventoryStats from "../components/InventoryStats";
import Table from "../components/Table";

const AdminView = () => {
  const { loading, error } = useFetchProducts();

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-white">Netrowk error, Please reload the page...</div>
    );
  }

  return (
    <div className="p-6">
      <InventoryStats />
      <Table adminView />
    </div>
  );
};

export default AdminView;
