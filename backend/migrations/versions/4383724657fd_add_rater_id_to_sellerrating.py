"""add rater_id to SellerRating

Revision ID: 4383724657fd
Revises: 
Create Date: 2025-04-14 19:06:08.392709

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4383724657fd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('seller_rating', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rater_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'user', ['rater_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('seller_rating', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('rater_id')

    # ### end Alembic commands ###
