import { Request, Response } from 'express';
import { ItemService } from '../services/itemService';

const itemService = new ItemService();

export class ItemController {
  getCategories = async (req: Request, res: Response) => {
    const categories = await itemService.getCategories();
    res.json(categories);
  }

  createCategory = async (req: Request, res: Response) => {
    const category = await itemService.createCategory(req.body);
    res.json(category);
  }

  updateCategory = async (req: Request, res: Response) => {
    const category = await itemService.updateCategory(Number(req.params.id), req.body);
    res.json(category);
  }

  deleteCategory = async (req: Request, res: Response) => {
    await itemService.deleteCategory(Number(req.params.id));
    res.json({ message: 'Category deleted' });
  }

  getDepartments = async (req: Request, res: Response) => {
    const departments = await itemService.getDepartments();
    res.json(departments);
  }

  createDepartment = async (req: Request, res: Response) => {
    const department = await itemService.createDepartment(req.body);
    res.json(department);
  }

  getItems = async (req: Request, res: Response) => {
    const items = await itemService.getItems();
    res.json(items);
  }

  getItemById = async (req: Request, res: Response) => {
    const item = await itemService.getItemById(Number(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  }

  createItem = async (req: Request, res: Response) => {
    const item = await itemService.createItem(req.body);
    res.json(item);
  }

  updateItem = async (req: Request, res: Response) => {
    const item = await itemService.updateItem(Number(req.params.id), req.body);
    res.json(item);
  }

  deleteItem = async (req: Request, res: Response) => {
    await itemService.deleteItem(Number(req.params.id));
    res.json({ message: 'Item deleted' });
  }
}
