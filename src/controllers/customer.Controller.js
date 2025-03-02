import Customer from "../models/Customer.model.js";

const createCustomer = async (req, res) => {
  try {
    const { name, address } = req.body;
    const userId = req.user.id;

    const lastCustomer = await Customer.findOne().sort({ createdAt: -1 });
    const lastId = lastCustomer ? parseInt(lastCustomer.customerId.replace("CUST", "")) : 0;
    const customerId = `CUST${String(lastId + 1).padStart(3, "0")}`;

    const newCustomer = new Customer({ customerId, name, address, user: userId });

    await newCustomer.save();

    res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error: error.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const userId = req.user.id;
    const customers = await Customer.find({ user: userId });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
};

export { createCustomer, getCustomers };
