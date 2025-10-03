import React, { useState } from "react";
import { Drawer, Button, TextField, Autocomplete, Select, MenuItem } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { FiFilter } from "react-icons/fi";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { filterRefundReducer } from '../../../redux/reducer/refund'

const FilterDrawer = ({ open, setOpen, isFiltered, setIsFiltered }) => {

  //////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const initialFilterState = {}

  //////////////////////////////////////////////// STATES /////////////////////////////////////////////////////
  const [filters, setFilters] = useState(initialFilterState)

  //////////////////////////////////////////////// USE EFFECT /////////////////////////////////////////////////////

  //////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
  const handleFilter = () => {
    dispatch(filterRefundReducer())
    setIsFiltered(false)
    setFilters(initialFilterState)
    setOpen(false);
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div style={{ minWidth: "50vh", maxWidth: "60vh" }}>
        <div className="flex justify-between items-center h-[10vh] bg-[#20aee3] p-5 text-white font-thin">
          <div className="flex items-center text-[25px] gap-2">
            <PiFunnelLight className="text-[25px]" />
            Filter Items
          </div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <table>
            <tr>
              <td className="w-24 pt-4">Approvals : </td>
              <td className="pt-4">
                <Select type="text" size="small" fullWidth>
                  <MenuItem value="accepted">Accepted</MenuItem>
                  <MenuItem value="underProcess">Under Process</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </td>
            </tr>
          </table>
          <div className="flex gap-4 justify-end">
            <button
              variant="contained"
              className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
              Reset
            </button>
            <button
              variant="contained"
              className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
              onClick={handleFilter}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
