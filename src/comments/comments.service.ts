import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comment.schema'
import { Model } from 'mongoose';
@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel:Model<Comment>){}
  create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create({
      text:createCommentDto.text,
      parent:createCommentDto.parentId || null,
      user:createCommentDto.userId,
      createdAt:createCommentDto.createdAt
    });
    
    return createdComment.then((doc)=>{
      return doc.populate(['user','parent'])
    });
  }

  findAll() {

    return this.commentModel.find().populate(["user","parent"]).exec();
  }

  geToplevelComments() {
    return this.commentModel
    .find(
      {parent:null}
    ).populate(["user","parent"])
    .exec();
  }

  getcommentByparentId(parentId:string){
    return this.commentModel
    .find({
      parent:parentId,
    })
    .populate(['user','parent'])
    .exec()
  }
async findOne(id: string) {
  return await this.commentModel.findById(id).populate('user').exec();
}

async update(id: string, updateCommentDto: UpdateCommentDto) {
  return await this.commentModel.findByIdAndUpdate(id, updateCommentDto, {
    new: true,
  }).exec();
}

async remove(id: string) {
  return await this.commentModel.findByIdAndDelete(id).exec();
}

}
