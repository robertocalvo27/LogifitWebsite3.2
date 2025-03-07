import { NextResponse } from 'next/server';
import { fetchAPI } from '@/lib/api/index';

// Eliminar un artículo
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Verificar que el ID sea válido
    if (!id) {
      return NextResponse.json(
        { error: 'ID de artículo no válido' },
        { status: 400 }
      );
    }
    
    // Eliminar el artículo en Strapi usando la mutación GraphQL correcta
    const mutation = `
      mutation DeleteArticle($id: ID!) {
        deleteArticle(id: $id) {
          data {
            id
          }
        }
      }
    `;

    await fetchAPI(mutation, {
      variables: {
        id: id
      }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    );
  }
} 