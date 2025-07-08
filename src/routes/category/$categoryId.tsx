import { createFileRoute, useNavigate } from '@tanstack/react-router';
import DynamicCategoryPage from '../../components/DynamicCategoryPage';

export const Route = createFileRoute('/category/$categoryId')({
  component: CategoryComponent,
});

function CategoryComponent() {
  const { categoryId } = Route.useParams();
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate({ to: '/product/$productId', params: { productId: productId.toString() } });
  };

  const handleBack = () => {
    navigate({ to: '/' });
  };

  return (
    <DynamicCategoryPage
      categoryId={categoryId}
      onProductClick={handleProductClick}
      onBack={handleBack}
    />
  );
}